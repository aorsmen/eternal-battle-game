// @ts-nocheck
import { getGameResult, getGameStats, sideLabel } from "./game";
import {
  GAME_DEFEAT_TITLE,
  GAME_DRAW_MESSAGE,
  GAME_DRAW_TITLE,
  GAME_VICTORY_TITLE,
} from "@/config/game";

const sides = (playerScore, computerScore, playerType = "villains") => ({
  player: { name: "altug", type: playerType, score: playerScore, lastScore: null },
  computer: {
    name: "Xeric",
    type: playerType === "heroes" ? "villains" : "heroes",
    score: computerScore,
    lastScore: null,
  },
});

test("sideLabel names each side", () => {
  expect(sideLabel("heroes")).toBe("Heroes");
  expect(sideLabel("villains")).toBe("Villains");
});

test("getGameResult reports a player victory", () => {
  expect(getGameResult(sides(7, 5))).toEqual({
    winner: "player",
    title: GAME_VICTORY_TITLE,
    message: "The villains rule the realm. Well played, altug.",
  });
});

test("getGameResult reports a defeat with the winning side", () => {
  expect(getGameResult(sides(4, 9))).toEqual({
    winner: "computer",
    title: GAME_DEFEAT_TITLE,
    message: "The heroes hold the line this time.",
  });
});

test("getGameResult reports a stalemate on equal scores", () => {
  expect(getGameResult(sides(6, 6))).toEqual({
    winner: "draw",
    title: GAME_DRAW_TITLE,
    message: GAME_DRAW_MESSAGE,
  });
});

test("getGameStats tallies battles, draws and rounds won", () => {
  const round = (...winners) => ({
    battles: winners.map((winner) => ({ winner })),
  });

  expect(
    getGameStats([
      round("player", "player", "computer", "draw", "draw"),
      round("computer", "computer", "player", "draw", "draw"),
      round("player", "computer", "draw", "draw", "draw"),
    ])
  ).toEqual({ battlesWon: 4, battlesLost: 4, draws: 7, roundsWon: 1 });
});
