// @ts-nocheck
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes, Route } from "react-router";
import { vi } from "vitest";
import { gameTheme } from "@/config/general";
import Battle from ".";
import SideSelect from "@/views/SideSelect";
import Gameplay from "@/views/Gameplay";

// End-to-end battle flow against the real store and the real hero data
const HEROES = JSON.parse(
  readFileSync(
    resolve(__dirname, "../../../public/data/all-heroes.json"),
    "utf8"
  )
);

let served;

const flushData = () => new Promise((r) => setTimeout(r, 50));

// A fresh query cache per test, like a page load
const renderBattle = () =>
  render(
    <ThemeProvider theme={gameTheme}>
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={["/battle"]}>
          <Routes>
            <Route path="battle" element={<Battle />}>
              <Route index element={<SideSelect />} />
              <Route path="play" element={<Gameplay />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );

const startGame = (side) => {
  fireEvent.change(screen.getByLabelText(/player name/i), {
    target: { value: "altug" },
  });
  fireEvent.click(screen.getByRole("radio", { name: new RegExp(side) }));
  fireEvent.click(screen.getByRole("button", { name: /start battle/i }));
};

const expectFullHands = () =>
  waitFor(
    () => {
      expect(screen.getAllByTestId("player-card-back")).toHaveLength(5);
      expect(screen.getAllByTestId("computer-card-back")).toHaveLength(5);
    },
    { timeout: 4000 }
  );

beforeEach(() => {
  served = structuredClone(HEROES);
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve({ json: () => Promise.resolve(served) }))
  );
});

afterEach(() => vi.unstubAllGlobals());

test.each(["HEROES", "VILLAINS"])(
  "Should deal five cards each after picking %s and starting",
  async (side) => {
    renderBattle();
    await flushData();
    startGame(side);

    expect(await screen.findByTestId("round-indicator")).toBeInTheDocument();
    await expectFullHands();
  }
);

test("Should still deal when the game starts before the hero data loads", async () => {
  renderBattle();
  startGame("VILLAINS");

  await expectFullHands();
});

test("Should never mark the cached hero data as used", async () => {
  renderBattle();
  await flushData();
  startGame("VILLAINS");
  await expectFullHands();

  expect(served.some((hero) => hero.used)).toBe(false);
});
