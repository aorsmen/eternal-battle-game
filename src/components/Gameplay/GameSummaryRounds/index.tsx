import { Box, Stack } from "@mui/material";
import useGameContext from "@/hooks/useGameContext";
import { GameSideTypes } from "@/types/game.types";
import { sideLabel } from "@/helpers/game";
import {
  EB_BORDER,
  EB_DISPLAY_FONT,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_TEXT_SUBTLE,
  EB_VILLAIN_LIGHT,
} from "@/config/general";
import { BattleTile } from "./styled.components";

const sideColor = (type: GameSideTypes) =>
  type === "heroes" ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT;

const GameSummaryRounds = () => {
  const { rounds, sides } = useGameContext();
  const computer = sides.computer;
  const player = sides.player;

  return (
    <Stack sx={{ gap: "36px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <Box
          component="h2"
          sx={{
            margin: 0,
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "0.2em",
            color: EB_TEXT_SUBTLE,
          }}
        >
          EVERY BATTLE
        </Box>
        <Box component="span" sx={{ fontSize: "14px", color: EB_TEXT_SUBTLE }}>
          Numbers show ATK / DEF
        </Box>
      </Box>

      {rounds.map((round, i) => {
        const computerWins = round.battles.filter(
          (b) => b.winner === "computer"
        ).length;
        const playerWins = round.battles.filter(
          (b) => b.winner === "player"
        ).length;

        return (
          <Stack
            key={i}
            component="section"
            aria-label={`Round ${i + 1}`}
            sx={{ gap: "12px" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: "12px",
                paddingBottom: "8px",
                borderBottom: `1px solid ${EB_BORDER}`,
              }}
            >
              <Box
                component="h3"
                sx={{
                  margin: 0,
                  fontFamily: EB_DISPLAY_FONT,
                  fontWeight: 400,
                  fontSize: "26px",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {`Round ${i + 1}`}
              </Box>
              <Box
                component="span"
                data-testid="round-tally"
                sx={{
                  fontFamily: EB_LABEL_FONT,
                  fontWeight: 700,
                  fontSize: "18px",
                  letterSpacing: "0.08em",
                }}
              >
                <Box component="span" sx={{ color: sideColor(computer.type) }}>
                  {sideLabel(computer.type)} {computerWins}
                </Box>
                {" – "}
                <Box component="span" sx={{ color: sideColor(player.type) }}>
                  {playerWins} {sideLabel(player.type)}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "10px",
              }}
            >
              {round.battles.map((battle, j) => (
                <BattleTile
                  key={j}
                  top={{
                    card: battle.cards.computer,
                    color: sideColor(computer.type),
                    isLoser: battle.winner === "player",
                  }}
                  bottom={{
                    card: battle.cards.player,
                    color: sideColor(player.type),
                    isLoser: battle.winner === "computer",
                  }}
                  winnerType={
                    battle.winner === "draw" ? null : sides[battle.winner].type
                  }
                />
              ))}
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default GameSummaryRounds;
