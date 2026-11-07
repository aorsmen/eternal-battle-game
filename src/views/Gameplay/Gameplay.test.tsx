// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import Gameplay from ".";
import { TEST_GAME_CONTEXT } from "@/__fixtures__/testData";

const renderGameplay = (value) => {
  renderGameContext(
    <MemoryRouter initialEntries={["/battle/play"]}>
      <Routes>
        <Route path="battle">
          <Route index element={<div>Side selection page</div>} />
          <Route path="play" element={<Gameplay />} />
        </Route>
      </Routes>
    </MemoryRouter>,
    { providerProps: { value }, withRouter: false }
  );
};

test("Should render the home link and the game board", () => {
  renderGameplay(TEST_GAME_CONTEXT);

  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByTestId("round-indicator")).toBeInTheDocument();
});

test("Should redirect to side selection when no side is chosen", () => {
  renderGameplay({
    ...TEST_GAME_CONTEXT,
    sides: {
      ...TEST_GAME_CONTEXT.sides,
      player: { ...TEST_GAME_CONTEXT.sides.player, type: null },
    },
  });

  expect(screen.getByText(/side selection page/i)).toBeInTheDocument();
});

test("Should show the round summary instead of the board when a round ends", () => {
  renderGameplay({
    ...TEST_GAME_CONTEXT,
    roundWinner: "draw",
    rounds: [{ result: "draw", battles: [], isStarted: true, isEnded: true }],
  });

  expect(screen.getByTestId("round-summary")).toBeInTheDocument();
  expect(screen.queryByTestId("round-indicator")).not.toBeInTheDocument();
});

test("Should keep the board after the last round so the end game can play", () => {
  const ended = { result: "draw", battles: [], isStarted: true, isEnded: true };

  renderGameplay({
    ...TEST_GAME_CONTEXT,
    roundWinner: "draw",
    rounds: Array(5).fill(ended),
  });

  expect(screen.queryByTestId("round-summary")).not.toBeInTheDocument();
  expect(screen.getByTestId("round-indicator")).toBeInTheDocument();
});

test("Should replace the board with the game summary after the end game overlay", () => {
  const ended = { result: "draw", battles: [], isStarted: true, isEnded: true };

  renderGameplay({
    ...TEST_GAME_CONTEXT,
    isGameOver: true,
    roundWinner: "draw",
    rounds: Array(5).fill(ended),
  });

  expect(screen.getByTestId("end-game")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /see game summary/i }));

  expect(screen.getByTestId("game-summary")).toBeInTheDocument();
  expect(screen.queryByTestId("round-indicator")).not.toBeInTheDocument();
});
