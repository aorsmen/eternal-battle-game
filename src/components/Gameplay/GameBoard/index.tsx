import { useState, useEffect } from "react";
import SideHands from "../../../components/Gameplay/SideHands";
import { BoardWrapper } from "./styled.components";
import SideBoard from "../../../components/Gameplay/SideBoard";
import useGameContext from "../../../hooks/useGameContext";
import EndGameAnimation from "../EndGameAnimation";

const GameBoard = () => {
  const { isGameOver, completeRound, sides } = useGameContext();

  return (
    <BoardWrapper>
      <SideBoard
        side="computer"
        data={sides.computer}
        onComplete={completeRound}
      />
      <SideHands />
      <SideBoard side="player" data={sides.player} onComplete={completeRound} />
      {isGameOver && <EndGameAnimation onClose={() => console.log("CLOSED")} />}
    </BoardWrapper>
  );
};

export default GameBoard;
