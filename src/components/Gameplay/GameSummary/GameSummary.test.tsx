// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import { screen, fireEvent } from "@testing-library/react";
import GameSummary from ".";
import {
  TEST_GAME_CONTEXT,
  TEST_HERO_DATA,
  TEST_END_GAME_ROUNDS,
} from "../../../__fixtures__/testData";
import { vi } from "vitest";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const mockCloseHandler = vi.fn();

TEST_END_GAME_ROUNDS[0].battles[0] = {
  winner: "draw",
  cards: { player: TEST_HERO_DATA, computer: TEST_HERO_DATA },
};

TEST_GAME_CONTEXT.rounds = TEST_END_GAME_ROUNDS;

test("Should not render the dialog", () => {
  renderGameContext(<GameSummary isOpen={false} onClose={mockCloseHandler} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.queryByText(/game summary/i);

  expect(title).not.toBeInTheDocument();
});

test("Should render the dialog, title and close button", () => {
  renderGameContext(<GameSummary isOpen={true} onClose={mockCloseHandler} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.getByText(/game summary/i);
  const closeBtn = screen.getByRole("button", {
    name: /close/i,
  });

  expect(title).toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument();
});

test("Should render the sides boards correctly", () => {
  TEST_GAME_CONTEXT.sides.computer.score = 6;
  TEST_GAME_CONTEXT.sides.player.score = 7;

  renderGameContext(<GameSummary isOpen={true} onClose={mockCloseHandler} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const computerLogo = screen.getByRole("img", {
    name: TEST_GAME_CONTEXT.sides.computer.type,
  });
  const playerLogo = screen.getByRole("img", {
    name: TEST_GAME_CONTEXT.sides.player.type,
  });
  const computerName = screen.getByText(TEST_GAME_CONTEXT.sides.computer.name);
  const playerName = screen.getByText(TEST_GAME_CONTEXT.sides.player.name);
  const computerScore = screen.getByText(
    TEST_GAME_CONTEXT.sides.computer.score
  );
  const playerScore = screen.getByText(TEST_GAME_CONTEXT.sides.player.score);

  expect(computerLogo).toBeInTheDocument();
  expect(playerLogo).toBeInTheDocument();
  expect(computerName).toBeInTheDocument();
  expect(playerName).toBeInTheDocument();
  expect(computerScore).toBeInTheDocument();
  expect(playerScore).toBeInTheDocument();
});

test("Should render the computer and player cards in round 1", () => {
  renderGameContext(<GameSummary isOpen={true} onClose={mockCloseHandler} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const cardTitles = screen.getAllByText(TEST_HERO_DATA.name);
  const cardImages = screen.getAllByRole("img", { name: TEST_HERO_DATA.name });

  expect(cardTitles).toHaveLength(2);
  expect(cardImages).toHaveLength(2);
});

test("Should render all the round wrappers", () => {
  renderGameContext(<GameSummary isOpen={true} onClose={mockCloseHandler} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  for (let i = 0; i < 5; i++) {
    const roundTitle = screen.getByText(`Round ${i + 1}`);

    expect(roundTitle).toBeInTheDocument();
  }
});

test("Should call the correct function when click the close button", () => {
  renderGameContext(<GameSummary isOpen={true} onClose={mockCloseHandler} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const closeBtn = screen.getByRole("button", {
    name: /close/i,
  });

  expect(closeBtn).toBeInTheDocument();

  fireEvent.click(closeBtn);

  expect(mockCloseHandler).toHaveBeenCalledTimes(1);
});
