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
    currentRound,
    roundWinner,
    rounds,
    isGameOver,
    setSideSelection,
    drawCard,
    revealCard,
    setBattleResult,
    setRoundScore,
    goToNextRound,
    completeRound,
    startNewRound,
  } = useContext(GameContext);

  return {
    sides,
    decks,
    hands,
    battles,
    currentBattle,
    currentRound,
    roundWinner,
    rounds,
    isGameOver,
    setSideSelection,
    drawCard,
    revealCard,
    setBattleResult,
    setRoundScore,
    goToNextRound,
    completeRound,
    startNewRound,
  };
};

export default useGameContext;
