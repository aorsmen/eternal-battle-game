// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
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
  TEST_END_GAME_ROUNDS,
  TEST_END_GAME_ROUND,
} from "@/__fixtures__/testData";
import { vi } from "vitest";
import { GAME_DRAW_MESSAGE, GAME_DRAW_TITLE } from "@/config/game";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const mockNextRoundHandler = vi.fn();

TEST_GAME_CONTEXT.goToNextRound = mockNextRoundHandler;

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

test("Should render player info in the side board", () => {
  renderGameContext(<GameBoard />, {
    providerProps: {
      value: {
        ...TEST_GAME_CTX.value,
        sides: {
          ...TEST_GAME_CTX.value.sides,
          player: {
            name: "test user",
            type: "heroes",
            score: 99,
            lastScore: null,
          },
        },
      },
    },
    withRouter: false,
  });

  const name = screen.getByText("test user");
  const score = screen.getByText(99);
  const subtitle = screen.getByText("Heroes · You");

  expect(name).toBeInTheDocument();
  expect(score).toBeInTheDocument();
  expect(subtitle).toBeInTheDocument();
});

test("Should render the round indicator, battle chip and round footer", () => {
  renderGameContext(<GameBoard />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  expect(screen.getByTestId("round-indicator")).toBeInTheDocument();
  expect(screen.getByTestId("battle-chip")).toHaveTextContent("VS");
  expect(screen.getByTestId("round-score")).toBeInTheDocument();
});

test("Should render the end game overlay with the stalemate result", () => {
  renderGameContext(<GameBoard />, {
    providerProps: {
      value: {
        ...TEST_GAME_CTX.value,
        isGameOver: true,
        rounds: TEST_END_GAME_ROUNDS,
      },
    },
    withRouter: false,
  });

  expect(
    screen.getByRole("heading", { name: GAME_DRAW_TITLE })
  ).toBeInTheDocument();
  expect(screen.getByText(GAME_DRAW_MESSAGE)).toBeInTheDocument();
});

test("Should ask for the game summary from the end game overlay", () => {
  const onShowGameSummary = vi.fn();

  renderGameContext(<GameBoard onShowGameSummary={onShowGameSummary} />, {
    providerProps: {
      value: {
        ...TEST_GAME_CTX.value,
        isGameOver: true,
        rounds: TEST_END_GAME_ROUNDS,
      },
    },
    withRouter: false,
  });

  fireEvent.click(screen.getByRole("button", { name: /see game summary/i }));

  expect(onShowGameSummary).toHaveBeenCalledTimes(1);
});

describe("Scoreless round", () => {
  const ENDED_ROUND = {
    result: "draw",
    battles: [],
    isStarted: true,
    isEnded: true,
  };
  const renderBoard = (overrides) => {
    const completeRound = vi.fn();
    renderGameContext(<GameBoard />, {
      providerProps: {
        value: {
          ...TEST_GAME_CTX.value,
          roundWinner: null,
          currentRound: 0,
          rounds: [ENDED_ROUND],
          sides: {
            player: { ...TEST_GAME_CTX.value.sides.player, lastScore: 0 },
            computer: { ...TEST_GAME_CTX.value.sides.computer, lastScore: 0 },
          },
          completeRound,
          ...overrides,
        },
      },
      withRouter: false,
    });
    return completeRound;
  };

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  test("Should complete an all-draws round after the score pause", () => {
    const completeRound = renderBoard();

    vi.advanceTimersByTime(1499);
    expect(completeRound).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(completeRound).toHaveBeenCalledTimes(1);
  });

  test("Should not complete a round that is still being played", () => {
    const completeRound = renderBoard({
      rounds: [{ ...ENDED_ROUND, isEnded: false }],
    });

    vi.advanceTimersByTime(5000);
    expect(completeRound).not.toHaveBeenCalled();
  });

  test("Should not complete a round that already has a winner", () => {
    const completeRound = renderBoard({ roundWinner: "draw" });

    vi.advanceTimersByTime(5000);
    expect(completeRound).not.toHaveBeenCalled();
  });

  test("Should leave scored rounds to the score animation", () => {
    const completeRound = renderBoard({
      sides: {
        player: { ...TEST_GAME_CTX.value.sides.player, lastScore: 2 },
        computer: { ...TEST_GAME_CTX.value.sides.computer, lastScore: 0 },
      },
    });

    vi.advanceTimersByTime(1500);
    expect(completeRound).not.toHaveBeenCalled();
  });
});
