import { useEffect } from "react";
import { Dialog, Typography } from "@mui/material";
import useGameContext from "@/hooks/useGameContext";
import { EB_BACKDROP, EB_DISPLAY_FONT, EB_GOLD } from "@/config/general";

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
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          background: "transparent",
          boxShadow: "none",
          overflow: "hidden",
        },
        "& .MuiBackdrop-root": { backgroundColor: EB_BACKDROP },
      }}
    >
      <Typography
        sx={{
          fontFamily: EB_DISPLAY_FONT,
          fontWeight: 400,
          fontSize: "clamp(56px, 10vw, 96px)",
          lineHeight: 1,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          textAlign: "center",
          color: EB_GOLD,
          margin: 0,
        }}
      >
        {roundText}
      </Typography>
    </Dialog>
  );
};

export default RoundStartDialog;
