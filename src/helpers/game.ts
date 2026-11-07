import {
  GameSidesObjectType,
  GameSideTypes,
  HandSidesType,
  RoundItemType,
} from "@/types/game.types";
import {
  GAME_DEFEAT_TITLE,
  GAME_DRAW_MESSAGE,
  GAME_DRAW_TITLE,
  GAME_LOSS_MESSAGE,
  GAME_VICTORY_TITLE,
  GAME_WIN_MESSAGE,
  SIDE_BOASTS,
} from "@/config/game";

export const sideLabel = (type: GameSideTypes) =>
  type === "heroes" ? "Heroes" : "Villains";

const fillMessage = (
  template: string,
  type: GameSideTypes,
  name: string
) =>
  template
    .replace("{SIDE}", sideLabel(type).toLowerCase())
    .replace("{BOAST}", type ? SIDE_BOASTS[type] : "")
    .replace("{NAME}", name);

// Final result of a finished game, from the player's point of view
export const getGameResult = (sides: GameSidesObjectType) => {
  const { player, computer } = sides;
  let winner: HandSidesType | "draw" = "draw";

  if (player.score > computer.score) {
    winner = "player";
  } else if (computer.score > player.score) {
    winner = "computer";
  }

  if (winner === "player") {
    return {
      winner,
      title: GAME_VICTORY_TITLE,
      message: fillMessage(GAME_WIN_MESSAGE, player.type, player.name),
    };
  }

  if (winner === "computer") {
    return {
      winner,
      title: GAME_DEFEAT_TITLE,
      message: fillMessage(GAME_LOSS_MESSAGE, computer.type, computer.name),
    };
  }

  return { winner, title: GAME_DRAW_TITLE, message: GAME_DRAW_MESSAGE };
};

// Battle and round tallies across the whole game, from the player's side
export const getGameStats = (rounds: RoundItemType[]) => {
  const stats = { battlesWon: 0, battlesLost: 0, draws: 0, roundsWon: 0 };

  rounds.forEach((round) => {
    let won = 0;
    let lost = 0;

    round.battles.forEach((battle) => {
      if (battle.winner === "player") won++;
      else if (battle.winner === "computer") lost++;
      else stats.draws++;
    });

    stats.battlesWon += won;
    stats.battlesLost += lost;
    if (won > lost) stats.roundsWon++;
  });

  return stats;
};
