import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import useGameContext from "../../../hooks/useGameContext";
import {
  TITLE_STYLE,
  VILLAIN_RED,
  HERO_BLUE,
  BROWN,
} from "../../../config/general";
import { ROUND_DRAW_MESSAGE, ROUND_WIN_MESSAGE } from "../../../config/game";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import heroIcon from "../../../assets/hero-icon.png";
import villainIcon from "../../../assets/villain-icon.png";

const NextRoundDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { roundWinner, sides, goToNextRound } = useGameContext();
  let textMsg = ROUND_DRAW_MESSAGE;
  let headerColor = BROWN;

  if (roundWinner !== null && roundWinner !== "draw") {
    textMsg = ROUND_WIN_MESSAGE.replace("{WINNER}", sides[roundWinner].name);
    headerColor =
      sides[roundWinner].type === "heroes" ? HERO_BLUE : VILLAIN_RED;
  }

  const nextRoundHandler = () => {
    goToNextRound();
    onClose();
  };

  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          background: headerColor,
          color: "#fff",
          textAlign: "center",
          ...TITLE_STYLE,
          fontSize: "28px",
        }}
      >
        Round Result
      </DialogTitle>
      <DialogContent>
        {roundWinner !== null && roundWinner !== "draw" && (
          <Stack alignItems="center">
            <Box sx={{ width: "36px", height: "60px", marginTop: "25px" }}>
              <img
                src={
                  sides[roundWinner].type === "heroes" ? heroIcon : villainIcon
                }
                alt={sides[roundWinner].type || ""}
              />
            </Box>
          </Stack>
        )}
        <Typography
          sx={{
            fontSize: "24px",
            textAlign: "center",
            marginBlock: "15px 25px",
          }}
        >
          {textMsg}
        </Typography>
        <Stack alignItems="center">
          <Button
            variant="contained"
            color="primary"
            endIcon={<KeyboardDoubleArrowRightIcon />}
            onClick={nextRoundHandler}
          >
            Next Round
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NextRoundDialog;
