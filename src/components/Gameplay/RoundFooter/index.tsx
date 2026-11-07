import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import useGameContext from "@/hooks/useGameContext";
import { GameSideTypes } from "@/types/game.types";
import {
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_TEXT_SUBTLE,
  EB_VILLAIN_LIGHT,
} from "@/config/general";

const sideLabel = (type: GameSideTypes) =>
  type === "heroes" ? "Heroes" : "Villains";
const sideColor = (type: GameSideTypes) =>
  type === "heroes" ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT;

const RoundFooter = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { sides, battles, hands } = useGameContext();
  const results = Object.values(battles.player);
  const playerWins = results.filter((b) => b.result === "win").length;
  const computerWins = results.filter((b) => b.result === "lose").length;
  const isReady = hands.player.length === 5;
  const isRoundOver = results.length >= 5;
  const computerType = sides.computer.type;
  const playerType = sides.player.type;

  return (
    <Stack
      component="footer"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        minHeight: matches ? "72px" : "52px",
        textAlign: "center",
      }}
    >
      <Box
        component="span"
        data-testid="round-score"
        sx={{
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: matches ? "18px" : "14px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        This round{"  "}
        <Box component="span" sx={{ color: sideColor(computerType) }}>
          {sideLabel(computerType)} {computerWins}
        </Box>
        {" – "}
        <Box component="span" sx={{ color: sideColor(playerType) }}>
          {playerWins} {sideLabel(playerType)}
        </Box>
      </Box>
      {isReady && !isRoundOver && (
        <Box
          component="span"
          sx={{ color: EB_TEXT_SUBTLE, fontSize: matches ? "16px" : "13px" }}
        >
          Pick one of your cards to reveal it and start the battle.
        </Box>
      )}
    </Stack>
  );
};

export default RoundFooter;
