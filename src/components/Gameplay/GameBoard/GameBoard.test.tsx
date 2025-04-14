// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import {
  screen,
  fireEvent,
  within,
  act,
  waitFor,
} from "@testing-library/react";
import GameBoard from ".";
import {
  TEST_GAME_CONTEXT,
  TEST_HERO_DATA,
} from "../../../__fixtures__/testData";
import { vi } from "vitest";
import { ROUND_DRAW_MESSAGE, ROUND_WIN_MESSAGE } from "../../../config/game";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const nextRoundHandler = vi.fn();

TEST_GAME_CONTEXT.goToNextRound = nextRoundHandler;

test("Should render player and computer card back", () => {
  renderGameContext(<GameBoard />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const playerCardBack = screen.getByTestId("player-card-back");
  const computerCardBack = screen.getByTestId("computer-card-back");

  expect(playerCardBack).toBeInTheDocument();
  expect(computerCardBack).toBeInTheDocument();
});

test("Should render the player card data", async () => {
  renderGameContext(<GameBoard />, {
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
  renderGameContext(<GameBoard />, {
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
  renderGameContext(<GameBoard />, {
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
  renderGameContext(<GameBoard />, {
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

test("Should not render the dialog", () => {
  renderGameContext(<GameBoard />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.queryByText(/round result/i);

  expect(title).not.toBeInTheDocument();
});

test("Should render the dialog, content and draw message correctly", () => {
  TEST_GAME_CONTEXT.roundWinner = "draw";

  renderGameContext(<GameBoard />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.getByText(/round result/i);
  const nextBtn = screen.getByRole("button", {
    name: /next round/i,
  });
  const drawMsg = screen.getByText(ROUND_DRAW_MESSAGE);

  expect(title).toBeInTheDocument();
  expect(nextBtn).toBeInTheDocument();
  expect(drawMsg).toBeInTheDocument();
});

test("Should render the dialog, content and win message correctly", () => {
  TEST_GAME_CONTEXT.roundWinner = "player";

  renderGameContext(<GameBoard />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.getByText(/round result/i);
  const nextBtn = screen.getByRole("button", {
    name: /next round/i,
  });
  const winMsg = screen.getByText(
    ROUND_WIN_MESSAGE.replace("{WINNER}", TEST_GAME_CONTEXT.sides.player.name)
  );

  expect(title).toBeInTheDocument();
  expect(nextBtn).toBeInTheDocument();
  expect(winMsg).toBeInTheDocument();
});

test("Should call the correct function when click the button", () => {
  renderGameContext(<GameBoard />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const nextBtn = screen.getByRole("button", {
    name: /next round/i,
  });

  expect(nextBtn).toBeInTheDocument();

  fireEvent.click(nextBtn);

  expect(nextRoundHandler).toHaveBeenCalledTimes(1);
});

test("Should render player info in the side board", () => {
  TEST_GAME_CONTEXT.sides.player = {
    name: "test user",
    type: "hero",
    score: 99,
  };

  renderGameContext(<GameBoard />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const name = screen.getByText("test user");
  const score = screen.getByText(99);
  const avatar = screen.getByRole("img", {
    name: "hero",
  });

  expect(name).toBeInTheDocument();
  expect(score).toBeInTheDocument();
  expect(avatar).toBeInTheDocument();
});
