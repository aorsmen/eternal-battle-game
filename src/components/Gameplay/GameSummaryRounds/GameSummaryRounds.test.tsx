// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import { screen } from "@testing-library/react";
import GameSummaryRounds from ".";
import {
  TEST_GAME_CONTEXT,
  TEST_HERO_DATA,
  TEST_END_GAME_ROUNDS,
} from "../../../__fixtures__/testData";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

TEST_END_GAME_ROUNDS[0].battles[0] = {
  winner: "draw",
  cards: { player: TEST_HERO_DATA, computer: TEST_HERO_DATA },
};

TEST_GAME_CONTEXT.rounds = TEST_END_GAME_ROUNDS;

test("Should render the computer and player cards in round 1", () => {
  renderGameContext(<GameSummaryRounds />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const cardTitles = screen.getAllByText(TEST_HERO_DATA.name);
  const cardImages = screen.getAllByRole("img", { name: TEST_HERO_DATA.name });

  expect(cardTitles).toHaveLength(2);
  expect(cardImages).toHaveLength(2);
});

test("Should render all the round wrappers", () => {
  renderGameContext(<GameSummaryRounds />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  for (let i = 0; i < 5; i++) {
    const roundTitle = screen.getByText(`Round ${i + 1}`);

    expect(roundTitle).toBeInTheDocument();
  }
});
