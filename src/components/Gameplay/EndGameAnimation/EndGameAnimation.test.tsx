// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import EndGameAnimation from ".";
import { TEST_GAME_CONTEXT } from "@/__fixtures__/testData";
import {
  GAME_DEFEAT_TITLE,
  GAME_DRAW_MESSAGE,
  GAME_DRAW_TITLE,
  GAME_VICTORY_TITLE,
} from "@/config/game";

// player = heroes ("test user 1"), computer = villains ("test user 2")
const renderOverlay = (scores, overrides = {}) => {
  const onClose = vi.fn();
  const startNewGame = vi.fn();

  renderGameContext(<EndGameAnimation onClose={onClose} />, {
    providerProps: {
      value: {
        ...TEST_GAME_CONTEXT,
        sides: {
          player: { ...TEST_GAME_CONTEXT.sides.player, score: scores[0] },
          computer: { ...TEST_GAME_CONTEXT.sides.computer, score: scores[1] },
        },
        startNewGame,
        ...overrides,
      },
    },
    withRouter: false,
  });

  return { onClose, startNewGame };
};

test("Should render the stalemate title and message", () => {
  renderOverlay([3, 3]);

  expect(
    screen.getByRole("heading", { name: GAME_DRAW_TITLE })
  ).toBeInTheDocument();
  expect(screen.getByText(GAME_DRAW_MESSAGE)).toBeInTheDocument();
});

test("Should render victory with the player's side and name", () => {
  renderOverlay([7, 6]);

  expect(
    screen.getByRole("heading", { name: GAME_VICTORY_TITLE })
  ).toBeInTheDocument();
  expect(
    screen.getByText("The heroes hold the line. Well played, test user 1.")
  ).toBeInTheDocument();
});

test("Should render defeat with the winning side", () => {
  renderOverlay([2, 6]);

  expect(
    screen.getByRole("heading", { name: GAME_DEFEAT_TITLE })
  ).toBeInTheDocument();
  expect(
    screen.getByText("The villains rule the realm this time.")
  ).toBeInTheDocument();
});

test("Should open the game summary", () => {
  const { onClose } = renderOverlay([1, 0]);

  fireEvent.click(screen.getByRole("button", { name: /see game summary/i }));

  expect(onClose).toHaveBeenCalledTimes(1);
});

test("Should start a new game without keeping the sides", () => {
  const { startNewGame } = renderOverlay([1, 0]);

  fireEvent.click(screen.getByRole("button", { name: /new game/i }));

  expect(startNewGame).toHaveBeenCalledTimes(1);
  expect(startNewGame).toHaveBeenCalledWith();
});
