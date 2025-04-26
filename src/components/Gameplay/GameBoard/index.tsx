import { useState } from "react";
import SideHands from "../../../components/Gameplay/SideHands";
import { BoardWrapper } from "./styled.components";
import SideBoard from "../../../components/Gameplay/SideBoard";
import useGameContext from "../../../hooks/useGameContext";
import EndGameAnimation from "../EndGameAnimation";
import GameSummary from "../GameSummary";

const GameBoard = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { isGameOver, completeRound, sides } = useGameContext();

  const ShowSummaryHandler = () => {
    setShowSummary(true);
  };

  return (
    <BoardWrapper>
      <SideBoard
        side="computer"
        data={sides.computer}
        onComplete={completeRound}
      />
      <SideHands />
      <SideBoard side="player" data={sides.player} onComplete={completeRound} />
      {isGameOver && <EndGameAnimation onClose={ShowSummaryHandler} />}
      {showSummary && (
        <GameSummary
          isOpen={showSummary}
          onClose={() => setShowSummary(false)}
        />
      )}
    </BoardWrapper>
  );
};

export default GameBoard;
