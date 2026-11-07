// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen } from "@testing-library/react";
import RoundFooter from ".";
import { TEST_GAME_CONTEXT, TEST_HERO_DATA } from "@/__fixtures__/testData";

const FULL_HAND = Array(5).fill(TEST_HERO_DATA);
const battle = (result) => ({ result, isEnded: true, isDead: false });

test("Should show this round's score with the computer side first", () => {
  // player = heroes, computer = villains in the test context
  renderGameContext(<RoundFooter />, {
    providerProps: {
      value: {
        ...TEST_GAME_CONTEXT,
        battles: {
          player: { 0: battle("win"), 1: battle("lose"), 2: battle("win") },
          computer: { 0: battle("lose"), 1: battle("win"), 2: battle("lose") },
        },
      },
    },
    withRouter: false,
  });

  expect(screen.getByTestId("round-score")).toHaveTextContent(
    "This round Villains 1 – 2 Heroes"
  );
});

test("Should show the hint while cards are left to reveal", () => {
  renderGameContext(<RoundFooter />, {
    providerProps: {
      value: {
        ...TEST_GAME_CONTEXT,
        hands: { player: FULL_HAND, computer: FULL_HAND },
      },
    },
    withRouter: false,
  });

  expect(screen.getByText(/pick one of your cards/i)).toBeInTheDocument();
});

test("Should hide the hint once all five battles are done", () => {
  const done = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i, battle("draw")]));

  renderGameContext(<RoundFooter />, {
    providerProps: {
      value: {
        ...TEST_GAME_CONTEXT,
        hands: { player: FULL_HAND, computer: FULL_HAND },
        battles: { player: done, computer: done },
      },
    },
    withRouter: false,
  });

  expect(screen.queryByText(/pick one of your cards/i)).not.toBeInTheDocument();
});
