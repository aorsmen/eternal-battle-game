// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { vi } from "vitest";
import SideSelect from ".";
import { TEST_GAME_CONTEXT } from "@/__fixtures__/testData";

const renderSideSelect = (playerName = "") => {
  const setSideSelection = vi.fn();
  const value = {
    ...TEST_GAME_CONTEXT,
    sides: {
      ...TEST_GAME_CONTEXT.sides,
      player: {
        ...TEST_GAME_CONTEXT.sides.player,
        name: playerName,
        type: null,
      },
    },
    setSideSelection,
  };

  renderGameContext(
    <MemoryRouter initialEntries={["/battle"]}>
      <Routes>
        <Route path="battle">
          <Route index element={<SideSelect />} />
          <Route path="play" element={<div>Game board page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
    { providerProps: { value }, withRouter: false }
  );

  return { setSideSelection };
};

test("Should render title, name input and both sides", () => {
  renderSideSelect();

  const title = screen.getByRole("heading", { name: /choose your side/i });
  const input = screen.getByRole("textbox", { name: /player name/i });
  const heroes = screen.getByRole("radio", { name: /heroes/i });
  const villains = screen.getByRole("radio", { name: /villains/i });

  expect(title).toBeInTheDocument();
  expect(input).toHaveValue("");
  expect(heroes).toHaveAttribute("aria-checked", "false");
  expect(villains).toHaveAttribute("aria-checked", "false");
});

test("Should prefill the name from a previous game", () => {
  renderSideSelect("test user");

  const input = screen.getByRole("textbox", { name: /player name/i });

  expect(input).toHaveValue("test user");
});

test("Should mark the clicked side as selected", () => {
  renderSideSelect();

  const villains = screen.getByRole("radio", { name: /villains/i });

  fireEvent.click(villains);

  expect(villains).toHaveAttribute("aria-checked", "true");
  expect(screen.getByText(/selected/i)).toBeInTheDocument();
});

test("Should show errors when starting without a name or side", () => {
  const { setSideSelection } = renderSideSelect();

  fireEvent.click(screen.getByRole("button", { name: /start battle/i }));

  expect(screen.getByText(/please enter a proper name/i)).toBeInTheDocument();
  expect(screen.getByText(/please choose a side/i)).toBeInTheDocument();
  expect(setSideSelection).not.toHaveBeenCalled();
});

test("Should save the selection and go to the game board", async () => {
  const { setSideSelection } = renderSideSelect();

  await userEvent.type(
    screen.getByRole("textbox", { name: /player name/i }),
    "test user"
  );
  fireEvent.click(screen.getByRole("radio", { name: /heroes/i }));
  fireEvent.click(screen.getByRole("button", { name: /start battle/i }));

  expect(setSideSelection).toHaveBeenCalledWith({
    name: "test user",
    type: "heroes",
    score: 0,
    lastScore: 0,
  });
  expect(screen.getByText(/game board page/i)).toBeInTheDocument();
});
