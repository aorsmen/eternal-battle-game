import { Typography, Stack, Box, Paper } from "@mui/material";
import { GameSidesItemType, HandSidesType } from "../../../types/game.types";
import { TITLE_STYLE, VILLAIN_RED, HERO_BLUE } from "../../../config/general";
import heroIcon from "../../../assets/hero-icon.png";
import villainIcon from "../../../assets/villain-icon.png";

const SideBoard = ({
  side,
  data,
}: {
  side: HandSidesType;
  data: GameSidesItemType;
}) => {
  const { name, score, type } = data;

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
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default SideBoard;
