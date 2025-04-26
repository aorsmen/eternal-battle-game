import { Dialog } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useGameContext from "../../../hooks/useGameContext";
import { BG_COLOR } from "../../../config/general";
import SideBoard from "../SideBoard";
import {
  GameSummaryBoards,
  GameSummaryHeader,
  GameSummaryBody,
} from "./styled.components";
import GameSummaryRounds from "../GameSummaryRounds";

gsap.registerPlugin(ScrollTrigger);

const GameSummary = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { sides } = useGameContext();

  return (
    <Dialog
      open={isOpen}
      fullScreen
      sx={{ "& .MuiPaper-root": { background: BG_COLOR } }}
    >
      <GameSummaryHeader title="GAME SUMMARY" onClose={onClose} />
      <GameSummaryBody justifyContent="center">
        <GameSummaryBoards
          computerBoard={<SideBoard side="computer" data={sides.computer} />}
          playerBoard={<SideBoard side="player" data={sides.player} />}
        />
        <GameSummaryRounds />
      </GameSummaryBody>
    </Dialog>
  );
};

export default GameSummary;
