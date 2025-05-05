import { Dialog, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const windowSize = matches ? "lg" : "sm";
  const { sides } = useGameContext();

  return (
    <Dialog
      open={isOpen}
      fullScreen
      sx={{ "& .MuiPaper-root": { background: BG_COLOR } }}
    >
      <GameSummaryHeader
        title="GAME SUMMARY"
        onClose={onClose}
        size={windowSize}
      />
      <GameSummaryBody justifyContent="center">
        <GameSummaryBoards
          computerBoard={<SideBoard side="computer" data={sides.computer} />}
          playerBoard={<SideBoard side="player" data={sides.player} />}
          isMobile={!matches}
        />
        <GameSummaryRounds />
      </GameSummaryBody>
    </Dialog>
  );
};

export default GameSummary;
