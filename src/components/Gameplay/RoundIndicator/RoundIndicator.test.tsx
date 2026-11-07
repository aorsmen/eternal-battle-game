// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen } from "@testing-library/react";
import RoundIndicator from ".";
import { TEST_GAME_CONTEXT } from "@/__fixtures__/testData";

test("Should render the current round out of five", () => {
  renderGameContext(<RoundIndicator />, {
    providerProps: { value: { ...TEST_GAME_CONTEXT, currentRound: 2 } },
    withRouter: false,
  });

  expect(screen.getByText("ROUND")).toBeInTheDocument();
  expect(screen.getByTestId("round-indicator")).toHaveTextContent("3 / 5");
});

test("Should mark finished, current and upcoming rounds in the pips", () => {
  renderGameContext(<RoundIndicator />, {
    providerProps: { value: { ...TEST_GAME_CONTEXT, currentRound: 2 } },
    withRouter: false,
  });

  const states = screen
    .getAllByTestId("round-pip")
    .map((pip) => pip.getAttribute("data-state"));

  expect(states).toEqual(["done", "done", "now", "next", "next"]);
});
