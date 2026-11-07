// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen, fireEvent } from "@testing-library/react";
import SideBoard from ".";
import { TEST_GAME_CONTEXT } from "@/__fixtures__/testData";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const TEST_SIDE_DATA = {
  name: "test user",
  type: "heroes",
  score: 99,
  lastScore: null,
};

test("Should render player info in the side board", () => {
  renderGameContext(<SideBoard side="player" data={TEST_SIDE_DATA} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const name = screen.getByText(TEST_SIDE_DATA.name);
  const score = screen.getByText(TEST_SIDE_DATA.score);
  const subtitle = screen.getByText("Heroes · You");

  expect(name).toBeInTheDocument();
  expect(score).toBeInTheDocument();
  expect(subtitle).toBeInTheDocument();
});

test("Should label the computer side as the opponent", () => {
  renderGameContext(
    <SideBoard side="computer" data={{ ...TEST_SIDE_DATA, type: "villains" }} />,
    { providerProps: TEST_GAME_CTX, withRouter: false }
  );

  expect(screen.getByText("Villains · Opponent")).toBeInTheDocument();
});

test("Should show the points gained this round", () => {
  renderGameContext(
    <SideBoard side="player" data={{ ...TEST_SIDE_DATA, lastScore: 3 }} />,
    { providerProps: TEST_GAME_CTX, withRouter: false }
  );

  expect(screen.getByText("+3")).toBeInTheDocument();
});

test("Should render nothing when no side is chosen", () => {
  renderGameContext(
    <SideBoard side="player" data={{ ...TEST_SIDE_DATA, type: null }} />,
    { providerProps: TEST_GAME_CTX, withRouter: false }
  );

  expect(screen.queryByTestId("player-plate")).not.toBeInTheDocument();
});
