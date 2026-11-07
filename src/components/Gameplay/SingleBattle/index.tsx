import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import useGameContext from "@/hooks/useGameContext";
import PlayerCardMotion from "@/components/Gameplay/PlayerCardMotion";
import ComputerCardMotion from "@/components/Gameplay/ComputerCardMotion";
import { BattleChip, BattleChipVariant } from "./styled.components";

const SingleBattle = ({ index }: { index: number }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { hands, sides, battles, setBattleResult, revealCard } =
    useGameContext();
  const isBattleReady = hands.player.length === 5;
  const playerBattle = battles.player[index];
  let chipVariant: BattleChipVariant = "wait";
  let chipLabel = "VS";

  if (playerBattle?.isEnded) {
    const winnerType =
      playerBattle.result === "win"
        ? sides.player.type
        : playerBattle.result === "lose"
          ? sides.computer.type
          : null;

    if (winnerType === null) {
      chipVariant = "draw";
      chipLabel = "Draw";
    } else {
      chipVariant = winnerType;
      chipLabel = `+1 ${winnerType === "heroes" ? "Heroes" : "Villains"}`;
    }
  }

  const revealHandler = () => {
    setIsRevealed(true);
    revealCard(index);
    setBattleResult(index);
  };

  const flipHandler = () => {
    if (isBattleReady) {
      setIsFlipped(true);
      setTimeout(revealHandler, 300);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: matches ? "14px" : "8px",
        paddingBlock: matches ? "0" : "12px",
      }}
    >
      <ComputerCardMotion
        index={index}
        isFlipped={isFlipped}
        isRevealed={isRevealed}
        result={battles.computer[index]?.result || "draw"}
      />
      <BattleChip variant={chipVariant} label={chipLabel} isMobile={!matches} />
      <PlayerCardMotion
        index={index}
        isFlipped={isFlipped}
        isRevealed={isRevealed}
        result={battles.player[index]?.result || "draw"}
        onClick={flipHandler}
      />
    </Box>
  );
};

export default SingleBattle;
