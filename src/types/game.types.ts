import { HeroDataType } from "./main.types";

export type BattleResultType = "win" | "lose" | "draw";
export type HandSidesType = "player" | "computer";
export type GameSideTypes = "heroes" | "villains" | null;
export type GameSidesItemType = {
  name: string;
  type: GameSideTypes;
  score: number;
  lastScore: number | null;
};
export type GameSidesObjectType = {
  [key in HandSidesType]: GameSidesItemType;
};
export type BattleItemType = {
  result: BattleResultType;
  isEnded: boolean;
};
export type BattleObjectType = {
  [key in string]: BattleItemType;
};
export type RoundBattleItemType = {
  winner: HandSidesType | "draw";
  cards: {
    [key in HandSidesType]: string;
  };
};
export type RoundItemType = {
  result: HandSidesType | "draw" | null;
  battles: RoundBattleItemType[];
  isStarted: boolean;
  isEnded: boolean;
};

export type GameContextType = {
  sides: GameSidesObjectType;
  decks: {
    heroes: HeroDataType[];
    villains: HeroDataType[];
  };
  hands: {
    [key in HandSidesType]: HeroDataType[];
  };
  battles: {
    [key in HandSidesType]: BattleObjectType;
  };
  currentBattle: number | undefined;
  currentRound: number;
  roundWinner: HandSidesType | "draw" | null;
  rounds: RoundItemType[];
  isGameOver: boolean;
  setSideSelection: (data: GameSidesItemType) => void;
  drawCard: () => void;
  revealCard: (index: number) => void;
  setBattleResult: (index: number) => void;
  setRoundScore: () => void;
  goToNextRound: () => void;
  completeRound: () => void;
  startNewRound: () => void;
};
