// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import { screen, fireEvent } from "@testing-library/react";
import EndGameAnimation from ".";
import { TEST_GAME_CONTEXT } from "../../../__fixtures__/testData";
import { vi } from "vitest";
import { GAME_DRAW_MESSAGE, GAME_WIN_MESSAGE } from "../../../config/game";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const mockCloseHandler = vi.fn();

test("Should render the animation and the draw end message correctly", () => {
  renderGameContext(<EndGameAnimation onClose={mockCloseHandler} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.getByText(/draw!/i);
  const endMsg = screen.getByText(GAME_DRAW_MESSAGE);

  expect(title).toBeInTheDocument();
  expect(endMsg).toBeInTheDocument();
});

test("Should render the animation, icon and victory end message correctly", () => {
  TEST_GAME_CONTEXT.sides.player.score = 1;

  renderGameContext(<EndGameAnimation onClose={mockCloseHandler} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.getByText(/victory!/i);
  const endMsg = screen.getByText(
    GAME_WIN_MESSAGE.replace("{WINNER}", TEST_GAME_CONTEXT.sides.player.name)
  );
  const icon = screen.getByRole("img", {
    name: TEST_GAME_CONTEXT.sides.player.type,
  });

  expect(title).toBeInTheDocument();
  expect(endMsg).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("Should render the animation, icon and failed end message correctly", () => {
  TEST_GAME_CONTEXT.sides.computer.score = 999;

  renderGameContext(<EndGameAnimation onClose={mockCloseHandler} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.getByText(/defeat!/i);
  const endMsg = screen.getByText(
    GAME_WIN_MESSAGE.replace("{WINNER}", TEST_GAME_CONTEXT.sides.computer.name)
  );
  const icon = screen.getByRole("img", {
    name: TEST_GAME_CONTEXT.sides.computer.type,
  });

  expect(title).toBeInTheDocument();
  expect(endMsg).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});
