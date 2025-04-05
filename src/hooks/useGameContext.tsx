import { useContext } from "react";
import { GameContext } from "../store/Game";
import { GameContextType } from "../types/game.types";

const useGameContext = (): GameContextType => {
  const {
    sides,
    decks,
    hands,
    battles,
    currentBattle,
    roundWinner,
    setSideSelection,
    drawCard,
    revealCard,
    setBattleResult,
    setRoundScore,
    goToNextRound,
  } = useContext(GameContext);

  return {
    sides,
    decks,
    hands,
    battles,
    currentBattle,
    roundWinner,
    setSideSelection,
    drawCard,
    revealCard,
    setBattleResult,
    setRoundScore,
    goToNextRound,
  };
};

export default useGameContext;
