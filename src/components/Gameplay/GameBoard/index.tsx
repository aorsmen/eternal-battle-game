import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import SideHands from "@/components/Gameplay/SideHands";
import { BoardWrapper } from "./styled.components";
import SideBoard from "@/components/Gameplay/SideBoard";
import RoundIndicator from "@/components/Gameplay/RoundIndicator";
import RoundFooter from "@/components/Gameplay/RoundFooter";
import useGameContext from "@/hooks/useGameContext";
import EndGameAnimation from "@/components/Gameplay/EndGameAnimation";
import { SCORE_ANIMATION_MS } from "@/config/game";

const GameBoard = ({
  onShowGameSummary,
}: {
  onShowGameSummary?: () => void;
}) => {
  const {
    isGameOver,
    completeRound,
    sides,
    rounds,
    currentRound,
    roundWinner,
  } = useGameContext();
  // A round is normally completed when a side's "+N" score animation ends.
  // With no points on either side there is no animation, so complete it here.
  const isScorelessRound =
    rounds[currentRound]?.isEnded === true &&
    roundWinner === null &&
    sides.player.lastScore === 0 &&
    sides.computer.lastScore === 0;

  // completeRound is recreated on every render; keep the latest one in a ref
  // so re-renders during the pause don't restart the timer
  const completeRoundRef = useRef(completeRound);

  useEffect(() => {
    completeRoundRef.current = completeRound;
  }, [completeRound]);

  useEffect(() => {
    if (!isScorelessRound) {
      return;
    }

    // Same pause as the score animation, so the last battle can be seen
    const timer = setTimeout(
      () => completeRoundRef.current(),
      SCORE_ANIMATION_MS
    );

    return () => clearTimeout(timer);
  }, [isScorelessRound]);

  return (
    <BoardWrapper>
      <Box
        component="header"
        sx={{
          display: "grid",
          alignItems: "center",
          gap: { xs: "10px", lg: "16px" },
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "minmax(0, 1fr) auto minmax(0, 1fr)",
          },
          gridTemplateAreas: {
            xs: '"round round" "computer player"',
            sm: '"computer round player"',
          },
        }}
      >
        <Box sx={{ gridArea: "computer", minWidth: 0 }}>
          <SideBoard
            side="computer"
            data={sides.computer}
            onComplete={completeRound}
          />
        </Box>
        <Box sx={{ gridArea: "round" }}>
          <RoundIndicator />
        </Box>
        <Box sx={{ gridArea: "player", minWidth: 0 }}>
          <SideBoard
            side="player"
            data={sides.player}
            onComplete={completeRound}
          />
        </Box>
      </Box>
      <SideHands />
      <RoundFooter />
      {isGameOver && (
        <EndGameAnimation onClose={() => onShowGameSummary?.()} />
      )}
    </BoardWrapper>
  );
};

export default GameBoard;
