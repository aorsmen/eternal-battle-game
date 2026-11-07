// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen, fireEvent, within } from "@testing-library/react";
import { vi } from "vitest";
import GameSummary from ".";
import {
  TEST_GAME_CONTEXT,
  TEST_HERO_DATA,
  TEST_HERO_DATA_2,
} from "@/__fixtures__/testData";
import { GAME_VICTORY_TITLE } from "@/config/game";

// player = heroes ("test user 1"), computer = villains ("test user 2")
const battle = (winner) => ({
  winner,
  cards: { player: TEST_HERO_DATA, computer: TEST_HERO_DATA_2 },
});
const round = (...winners) => ({
  result: null,
  battles: winners.map(battle),
  isStarted: true,
  isEnded: true,
});
// Player wins 7 battles and 3 rounds, loses 5 battles, 13 draws
const ROUNDS = [
  round("player", "player", "computer", "draw", "draw"),
  round("player", "computer", "computer", "draw", "draw"),
  round("player", "player", "draw", "draw", "draw"),
  round("computer", "computer", "draw", "draw", "draw"),
  round("player", "player", "draw", "draw", "draw"),
];

const renderSummary = (overrides = {}) => {
  const onRestart = vi.fn();
  const startNewGame = vi.fn();

  renderGameContext(<GameSummary onRestart={onRestart} />, {
    providerProps: {
      value: {
        ...TEST_GAME_CONTEXT,
        isGameOver: true,
        rounds: ROUNDS,
        sides: {
          player: { ...TEST_GAME_CONTEXT.sides.player, score: 7 },
          computer: { ...TEST_GAME_CONTEXT.sides.computer, score: 5 },
        },
        startNewGame,
        ...overrides,
      },
    },
    withRouter: true,
  });

  return { onRestart, startNewGame };
};

test("Should render the result banner with the final score", () => {
  renderSummary();

  expect(screen.getByText("FINAL RESULT · 5 ROUNDS")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 1, name: GAME_VICTORY_TITLE })
  ).toHaveFocus();
  expect(screen.getByTestId("final-score")).toHaveTextContent(
    "5test user 2 · Villains–7test user 1 · Heroes"
  );
});

test("Should render the match stats", () => {
  renderSummary();

  const tiles = screen.getAllByTestId("stat-tile").map((t) => t.textContent);

  expect(tiles).toEqual([
    "7Battles you won",
    "5Battles you lost",
    "13Draws",
    "3Rounds you won",
  ]);
});

test("Should render every round with its battles", () => {
  renderSummary();

  for (let i = 1; i <= 5; i++) {
    const section = screen.getByRole("region", { name: `Round ${i}` });

    expect(within(section).getAllByTestId("battle-tile")).toHaveLength(5);
  }
});

test("Should start a rematch keeping the sides", () => {
  const { onRestart, startNewGame } = renderSummary();

  fireEvent.click(screen.getAllByRole("button", { name: /rematch/i })[0]);

  expect(startNewGame).toHaveBeenCalledWith(true);
  expect(onRestart).toHaveBeenCalledTimes(1);
});

test("Should start a new game from side selection", () => {
  const { onRestart, startNewGame } = renderSummary();

  fireEvent.click(screen.getAllByRole("button", { name: /new game/i })[0]);

  expect(startNewGame).toHaveBeenCalledWith();
  expect(onRestart).toHaveBeenCalledTimes(1);
});

test("Should link home", () => {
  renderSummary();

  screen
    .getAllByRole("link", { name: /home/i })
    .forEach((link) => expect(link).toHaveAttribute("href", "/"));
});
