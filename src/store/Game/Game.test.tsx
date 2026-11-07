// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { vi } from "vitest";
import GameContextProvider, { GameContext } from ".";

const RoundProbe = () => {
  const { rounds, sides, startNewRound, startNewGame, setSideSelection } =
    useContext(GameContext);

  return (
    <>
      <span data-testid="round-1-started">{String(rounds[0].isStarted)}</span>
      <span data-testid="sides">
        {`${sides.player.name}:${sides.player.type}|${sides.computer.name}:${sides.computer.type}`}
      </span>
      <button onClick={startNewRound}>start round</button>
      <button onClick={() => startNewGame()}>new game</button>
      <button onClick={() => startNewGame(true)}>rematch</button>
      <button
        onClick={() =>
          setSideSelection({
            name: "altug",
            type: "villains",
            score: 0,
            lastScore: 0,
          })
        }
      >
        pick villains
      </button>
    </>
  );
};

const renderStore = () =>
  renderWithProviders(
    <GameContextProvider>
      <RoundProbe />
    </GameContextProvider>,
    { withRouter: false }
  );

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }))
  );
});

afterEach(() => vi.unstubAllGlobals());

test("Should mark the current round as started", () => {
  renderStore();

  expect(screen.getByTestId("round-1-started")).toHaveTextContent("false");

  fireEvent.click(screen.getByText("start round"));

  expect(screen.getByTestId("round-1-started")).toHaveTextContent("true");
});

test("Should start the next game with round 1 not started", () => {
  const { unmount } = renderStore();

  fireEvent.click(screen.getByText("start round"));
  unmount();

  // A fresh provider (e.g. leaving /battle and coming back) starts clean
  renderStore();

  expect(screen.getByTestId("round-1-started")).toHaveTextContent("false");
});

test("Should reset round 1 when starting a new game", () => {
  renderStore();

  fireEvent.click(screen.getByText("start round"));
  fireEvent.click(screen.getByText("new game"));

  expect(screen.getByTestId("round-1-started")).toHaveTextContent("false");
});

test("Should keep names and sides on a rematch", () => {
  renderStore();

  fireEvent.click(screen.getByText("pick villains"));
  const before = screen.getByTestId("sides").textContent;

  // (The round isn't started here: the stubbed data has no heroes to draw)
  fireEvent.click(screen.getByText("rematch"));

  expect(before).toMatch(/^altug:villains\|.+:heroes$/);
  expect(screen.getByTestId("sides")).toHaveTextContent(before);
});

test("Should clear the sides but keep names on a new game", () => {
  renderStore();

  fireEvent.click(screen.getByText("pick villains"));
  fireEvent.click(screen.getByText("new game"));

  expect(screen.getByTestId("sides").textContent).toMatch(
    /^altug:null\|.+:null$/
  );
});
