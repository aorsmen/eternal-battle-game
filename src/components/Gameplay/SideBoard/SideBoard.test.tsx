// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import { screen, fireEvent } from "@testing-library/react";
import SideBoard from ".";
import { TEST_GAME_CONTEXT } from "../../../__fixtures__/testData";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const TEST_SIDE_DATA = {
  name: "test user",
  type: "hero",
  score: 99,
};

test("Should render player info in the side board", () => {
  renderGameContext(<SideBoard side="player" data={TEST_SIDE_DATA} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const name = screen.getByText(TEST_SIDE_DATA.name);
  const score = screen.getByText(TEST_SIDE_DATA.score);
  const avatar = screen.getByRole("img", {
    name: TEST_SIDE_DATA.type,
  });

  expect(name).toBeInTheDocument();
  expect(score).toBeInTheDocument();
  expect(avatar).toBeInTheDocument();
});
