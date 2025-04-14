// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import {
  screen,
  fireEvent,
  within,
  act,
  waitFor,
} from "@testing-library/react";
import SingleBattle from ".";
import {
  TEST_GAME_CONTEXT,
  TEST_HERO_DATA,
} from "../../../__fixtures__/testData";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

test("Should render player and computer card back", () => {
  renderGameContext(<SingleBattle index={0} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const playerCardBack = screen.getByTestId("player-card-back");
  const computerCardBack = screen.getByTestId("computer-card-back");

  expect(playerCardBack).toBeInTheDocument();
  expect(computerCardBack).toBeInTheDocument();
});

test("Should render the player card data", async () => {
  renderGameContext(<SingleBattle index={0} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const cardWrapper = screen.getByTestId("player-card-wrapper");

  expect(cardWrapper).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(cardWrapper);
  });

  waitFor(() => {
    const image = within(cardWrapper).getByAltText(TEST_HERO_DATA.name);
    const name = within(cardWrapper).getByText(TEST_HERO_DATA.name);
    const type = within(cardWrapper).getByText(
      TEST_HERO_DATA.biography.alignment === "good" ? "Hero" : "Villain"
    );
    const desc = within(cardWrapper).getByText(TEST_HERO_DATA.work.occupation);

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });
});

test("Should render the computer card data", async () => {
  renderGameContext(<SingleBattle index={0} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const playerCardWrapper = screen.getByTestId("player-card-wrapper");
  const computerCardWrapper = screen.getByTestId("computer-card-wrapper");

  expect(playerCardWrapper).toBeInTheDocument();
  expect(computerCardWrapper).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(playerCardWrapper);
  });

  waitFor(() => {
    const image = within(computerCardWrapper).getByAltText(TEST_HERO_DATA.name);
    const name = within(computerCardWrapper).getByText(TEST_HERO_DATA.name);
    const type = within(computerCardWrapper).getByText(
      TEST_HERO_DATA.biography.alignment === "good" ? "Hero" : "Villain"
    );
    const desc = within(computerCardWrapper).getByText(
      TEST_HERO_DATA.work.occupation
    );

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });
});

test("Should render preview image in the player and computer card", async () => {
  renderGameContext(<SingleBattle index={0} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const playerCardWrapper = screen.getByTestId("player-card-wrapper");
  const computerCardWrapper = screen.getByTestId("computer-card-wrapper");

  expect(playerCardWrapper).toBeInTheDocument();
  expect(computerCardWrapper).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(playerCardWrapper);
  });

  waitFor(() => {
    const playerPreviewBtn =
      within(playerCardWrapper).getByTestId("VisibilityIcon");
    const computerPreviewBtn =
      within(computerCardWrapper).getByTestId("VisibilityIcon");

    expect(playerPreviewBtn).toBeInTheDocument();
    expect(computerPreviewBtn).toBeInTheDocument();

    fireEvent.click(playerPreviewBtn);
    fireEvent.click(computerPreviewBtn);

    const playerImage = within(playerCardWrapper).getAllByAltText(
      TEST_HERO_DATA.name
    );
    const computerImage = within(computerCardWrapper).getAllByAltText(
      TEST_HERO_DATA.name
    );

    expect(playerImage).toHaveLength(2);
    expect(computerImage).toHaveLength(2);
  });
});

test("Should render the player and computer card attack/defense correctly", async () => {
  renderGameContext(<SingleBattle index={0} />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const playerCardWrapper = screen.getByTestId("player-card-wrapper");
  const computerCardWrapper = screen.getByTestId("computer-card-wrapper");

  expect(playerCardWrapper).toBeInTheDocument();
  expect(computerCardWrapper).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(playerCardWrapper);
  });

  waitFor(() => {
    const playerValues = within(playerCardWrapper).getByText(
      `${TEST_HERO_DATA.values.attack}/${TEST_HERO_DATA.values.defense}`
    );
    const computerValues = within(computerCardWrapper).getByText(
      `${TEST_HERO_DATA.values.attack}/${TEST_HERO_DATA.values.defense}`
    );

    expect(playerValues).toBeInTheDocument();
    expect(computerValues).toBeInTheDocument();
  });
});
