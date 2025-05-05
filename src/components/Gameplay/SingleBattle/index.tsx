import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import useGameContext from "../../../hooks/useGameContext";
import PlayerCardMotion from "../PlayerCardMotion";
import ComputerCardMotion from "../ComputerCardMotion";
import { BattleControls } from "./styled.components";

const SingleBattle = ({ index }: { index: number }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { hands, currentBattle, battles, setBattleResult, revealCard } =
    useGameContext();
  const isBattleReady = hands.player.length === 5;
  const isCurrentBattle = currentBattle === index;

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
    <Box>
      <ComputerCardMotion
        index={index}
        isFlipped={isFlipped}
        isRevealed={isRevealed}
        result={battles.computer[index]?.result || "draw"}
      />
      <BattleControls isCurrent={isCurrentBattle} isMobile={!matches} />
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
