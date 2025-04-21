import { useEffect } from "react";
import { Dialog, Typography } from "@mui/material";
import useGameContext from "../../../hooks/useGameContext";
import { TITLE_STYLE, YELLOW } from "../../../config/general";

const RoundStartDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { currentRound, startNewRound } = useGameContext();
  const roundText =
    currentRound < 4 ? `Round ${currentRound + 1}` : "Final Round";

  useEffect(() => {
    if (isOpen) {
      startNewRound();
      const timer = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog
      open={isOpen}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiPaper-root": { background: "transparent", boxShadow: "none" },
      }}
    >
      <Typography
        sx={{
          ...TITLE_STYLE,
          textAlign: "center",
          color: YELLOW,
          fontSize: "48px",
        }}
      >
        {roundText}
      </Typography>
    </Dialog>
  );
};

export default RoundStartDialog;
