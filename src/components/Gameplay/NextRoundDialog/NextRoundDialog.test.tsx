// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import { screen, fireEvent } from "@testing-library/react";
import NextRoundDialog from ".";
import {
  TEST_GAME_CONTEXT,
  TEST_HERO_DATA,
} from "../../../__fixtures__/testData";
import { vi } from "vitest";
import { ROUND_DRAW_MESSAGE, ROUND_WIN_MESSAGE } from "../../../config/game";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const mockCloseHandler = vi.fn();
const MockNextRoundHandler = vi.fn();

TEST_GAME_CONTEXT.goToNextRound = MockNextRoundHandler;

test("Should not render the dialog", () => {
  renderGameContext(
    <NextRoundDialog isOpen={false} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const title = screen.queryByText(/round result/i);

  expect(title).not.toBeInTheDocument();
});

test("Should render the dialog, content and draw message correctly", () => {
  renderGameContext(
    <NextRoundDialog isOpen={true} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const title = screen.getByText(/round result/i);
  const nextBtn = screen.getByRole("button", {
    name: /next round/i,
  });
  const drawMsg = screen.getByText(ROUND_DRAW_MESSAGE);

  expect(title).toBeInTheDocument();
  expect(nextBtn).toBeInTheDocument();
  expect(drawMsg).toBeInTheDocument();
});

test("Should render the dialog, icon and win message correctly", () => {
  TEST_GAME_CONTEXT.roundWinner = "player";

  renderGameContext(
    <NextRoundDialog isOpen={true} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const title = screen.getByText(/round result/i);
  const nextBtn = screen.getByRole("button", {
    name: /next round/i,
  });
  const winMsg = screen.getByText(
    ROUND_WIN_MESSAGE.replace("{WINNER}", TEST_GAME_CONTEXT.sides.player.name)
  );
  const icon = screen.getByRole("img", {
    name: TEST_GAME_CONTEXT.sides.player.type,
  });

  expect(title).toBeInTheDocument();
  expect(nextBtn).toBeInTheDocument();
  expect(winMsg).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("Should call the correct function when click the button", () => {
  renderGameContext(
    <NextRoundDialog isOpen={true} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const nextBtn = screen.getByRole("button", {
    name: /next round/i,
  });

  expect(nextBtn).toBeInTheDocument();

  fireEvent.click(nextBtn);

  expect(MockNextRoundHandler).toHaveBeenCalledTimes(1);
});
