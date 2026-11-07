import { useState } from "react";
import { Stack } from "@mui/material";
import { Navigate } from "react-router";
import TopBar from "@/components/UI/TopBar";
import { GameWrapper } from "./styled.components";
import GameBoard from "@/components/Gameplay/GameBoard";
import RoundSummary from "@/components/Gameplay/RoundSummary";
import GameSummary from "@/components/Gameplay/GameSummary";
import useGameContext from "@/hooks/useGameContext";
import { ROUND_COUNT } from "@/config/game";

const Gameplay = () => {
  const { sides, roundWinner, rounds, isGameOver } = useGameContext();
  const [summaryRequested, setSummaryRequested] = useState(false);
  // The game summary replaces the board once the end-game overlay asks for it
  const showGameSummary = summaryRequested && isGameOver;
  // A finished round (other than the last) shows its summary in place of the board
  const showRoundSummary = roundWinner !== null && rounds.length < ROUND_COUNT;

  // No side picked yet (direct visit or "New game"): go to side selection
  if (sides.player.type === null) {
    return <Navigate to="/battle" replace />;
  }

  return (
    <GameWrapper>
      <Stack
        component="main"
        sx={{ maxWidth: "1414px", marginInline: "auto", gap: "16px" }}
      >
        <TopBar />
        {showGameSummary ? (
          <GameSummary onRestart={() => setSummaryRequested(false)} />
        ) : showRoundSummary ? (
          <RoundSummary />
        ) : (
          <GameBoard onShowGameSummary={() => setSummaryRequested(true)} />
        )}
      </Stack>
    </GameWrapper>
  );
};

export default Gameplay;
