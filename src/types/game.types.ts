import { HeroDataType } from "./main.types";

export type BattleResultType = "win" | "lose" | "draw";
export type HandSidesType = "player" | "computer";
export type GameSideTypes = "heroes" | "villains" | null;
export type GameSidesItemType = {
  name: string;
  type: GameSideTypes;
  score: number;
};
export type GameSidesObjectType = {
  player: GameSidesItemType;
  computer: GameSidesItemType;
};
export type BattleItemType = {
  result: BattleResultType;
  isEnded: boolean;
};

export type GameContextType = {
  sides: GameSidesObjectType;
  decks: {
    heroes: HeroDataType[];
    villains: HeroDataType[];
  };
  hands: {
    player: HeroDataType[];
    computer: HeroDataType[];
  };
  battles: {
    player: BattleItemType[];
    computer: BattleItemType[];
  };
  currentBattle: number | undefined;
  roundWinner: HandSidesType | "draw" | null;
  setSideSelection: (data: GameSidesItemType) => void;
  drawCard: () => void;
  revealCard: (index: number) => void;
  setBattleResult: (index: number) => void;
  setRoundScore: () => void;
  goToNextRound: () => void;
};
