import { Typography, Stack, Box, Paper, Button, Fade } from "@mui/material";
import useGameContext from "../../../hooks/useGameContext";
import { HandSidesType } from "../../../types/game.types";
import { TITLE_STYLE, VILLAIN_RED, HERO_BLUE } from "../../../config/general";
import heroIcon from "../../../assets/hero-icon.png";
import villainIcon from "../../../assets/villain-icon.png";

const SideBoard = ({ side }: { side: HandSidesType }) => {
  const { sides, setRoundScore, battles } = useGameContext();
  const { name, score, type } = sides[side];
  const isRoundEnded = battles.player.length === 5;

  return (
    <>
      {type !== null && (
        <Paper
          sx={{
            padding: "10px 15px",
            border: `1px solid ${type === "heroes" ? HERO_BLUE : VILLAIN_RED}`,
            backgroundColor: "transparent",
          }}
        >
          <Stack
            direction={side === "computer" ? "row" : "row-reverse"}
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction={side === "computer" ? "row" : "row-reverse"}
              alignItems="center"
              spacing={2}
            >
              <Box sx={{ width: "24px", height: "40px" }}>
                <img
                  src={type === "heroes" ? heroIcon : villainIcon}
                  alt={type || ""}
                />
              </Box>
              <Typography
                sx={{ ...TITLE_STYLE, fontSize: "24px" }}
                color="primary"
              >
                {name}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: "28px" }} color="secondary">
              {score}
            </Typography>
            {side === "player" && (
              <Fade in={isRoundEnded}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ marginInlineEnd: "auto !important" }}
                  onClick={setRoundScore}
                >
                  End Round
                </Button>
              </Fade>
            )}
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default SideBoard;
