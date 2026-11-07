// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen, fireEvent, within } from "@testing-library/react";
import { vi } from "vitest";
import RoundSummary from ".";
import {
  TEST_GAME_CONTEXT,
  TEST_HERO_DATA,
  TEST_HERO_DATA_2,
} from "@/__fixtures__/testData";
import {
  ROUND_DRAW_TITLE,
  ROUND_PLAYER_WIN_TITLE,
  ROUND_WIN_TITLE,
} from "@/config/game";

// player = heroes ("test user 1"), computer = villains ("test user 2")
const battle = (winner) => ({
  winner,
  cards: { player: TEST_HERO_DATA, computer: TEST_HERO_DATA_2 },
});

const ROUND = {
  result: "player",
  battles: [
    battle("player"),
    battle("computer"),
    battle("player"),
    battle("draw"),
    battle("draw"),
  ],
  isStarted: true,
  isEnded: true,
};

const renderSummary = (overrides = {}) =>
  renderGameContext(<RoundSummary />, {
    providerProps: {
      value: {
        ...TEST_GAME_CONTEXT,
        currentRound: 0,
        rounds: [ROUND],
        roundWinner: "player",
        sides: {
          player: { ...TEST_GAME_CONTEXT.sides.player, score: 2 },
          computer: { ...TEST_GAME_CONTEXT.sides.computer, score: 1 },
        },
        ...overrides,
      },
    },
    withRouter: true,
  });

test("Should render the round header, title and round score", () => {
  renderSummary();

  expect(screen.getByText("ROUND 1 OF 5 COMPLETE")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: ROUND_PLAYER_WIN_TITLE })
  ).toHaveFocus();
  expect(screen.getByTestId("round-summary-score")).toHaveTextContent(
    "1test user 2–2test user 1"
  );
});

test("Should name the computer when it takes the round", () => {
  renderSummary({ roundWinner: "computer" });

  expect(
    screen.getByRole("heading", {
      name: ROUND_WIN_TITLE.replace("{WINNER}", "test user 2"),
    })
  ).toBeInTheDocument();
});

test("Should show the draw title", () => {
  renderSummary({ roundWinner: "draw" });

  expect(
    screen.getByRole("heading", { name: ROUND_DRAW_TITLE })
  ).toBeInTheDocument();
});

test("Should render one row per battle with both cards and the result", () => {
  renderSummary();

  const rows = screen.getAllByTestId("round-summary-row");

  expect(rows).toHaveLength(5);
  expect(within(rows[0]).getByText(TEST_HERO_DATA_2.name)).toBeInTheDocument();
  expect(within(rows[0]).getByText(TEST_HERO_DATA.name)).toBeInTheDocument();
  expect(within(rows[0]).getByTestId("battle-chip")).toHaveTextContent(
    "+1 Heroes"
  );
  expect(within(rows[1]).getByTestId("battle-chip")).toHaveTextContent(
    "+1 Villains"
  );
  expect(within(rows[3]).getByTestId("battle-chip")).toHaveTextContent("Draw");
});

test("Should render the match score so far", () => {
  renderSummary();

  expect(screen.getByText("MATCH SCORE AFTER 1 ROUND")).toBeInTheDocument();
  expect(screen.getByTestId("match-score")).toHaveTextContent("1 – 2");
});

test("Should go to the next round when the button is clicked", () => {
  const goToNextRound = vi.fn();
  renderSummary({ goToNextRound });

  fireEvent.click(screen.getByRole("button", { name: /next round/i }));

  expect(goToNextRound).toHaveBeenCalledTimes(1);
});

test("Should link quit back to the home page", () => {
  renderSummary();

  expect(screen.getByRole("link", { name: /quit/i })).toHaveAttribute(
    "href",
    "/"
  );
});
