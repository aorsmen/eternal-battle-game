// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen, within } from "@testing-library/react";
import GameSummaryRounds from ".";
import {
  TEST_GAME_CONTEXT,
  TEST_HERO_DATA,
  TEST_HERO_DATA_2,
} from "@/__fixtures__/testData";

// player = heroes, computer = villains
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

const renderRounds = (rounds) =>
  renderGameContext(<GameSummaryRounds />, {
    providerProps: { value: { ...TEST_GAME_CONTEXT, rounds } },
    withRouter: false,
  });

test("Should render a section per round with its tally", () => {
  renderRounds([ROUND, ROUND]);

  const round1 = screen.getByRole("region", { name: "Round 1" });

  expect(screen.getByRole("region", { name: "Round 2" })).toBeInTheDocument();
  expect(within(round1).getByTestId("round-tally")).toHaveTextContent(
    "Villains 1 – 2 Heroes"
  );
});

test("Should render both cards with ATK / DEF in each tile", () => {
  renderRounds([ROUND]);

  const tile = screen.getAllByTestId("battle-tile")[0];
  const { attack, defense } = TEST_HERO_DATA.values;

  expect(within(tile).getByText(TEST_HERO_DATA.name)).toBeInTheDocument();
  expect(within(tile).getByText(TEST_HERO_DATA_2.name)).toBeInTheDocument();
  expect(
    within(tile).getAllByText(`${attack} / ${defense}`).length
  ).toBeGreaterThan(0);
});

test("Should tag each battle with its result", () => {
  renderRounds([ROUND]);

  const tags = screen
    .getAllByTestId("battle-tile")
    .map((tile) => tile.lastChild.textContent);

  expect(tags).toEqual([
    "+1 Heroes",
    "+1 Villains",
    "+1 Heroes",
    "Draw",
    "Draw",
  ]);
});
