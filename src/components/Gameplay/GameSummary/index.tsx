import { useEffect, useRef } from "react";
import { Box, Stack } from "@mui/material";
import useGameContext from "@/hooks/useGameContext";
import { GameSideTypes } from "@/types/game.types";
import { ROUND_COUNT } from "@/config/game";
import {
  EB_BORDER,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_HERO_BG,
  EB_HERO_BORDER,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_FAINT,
  EB_TEXT_SUBTLE,
  EB_VILLAIN_BG,
  EB_VILLAIN_BORDER,
  EB_VILLAIN_LIGHT,
  EB_VILLAIN_TEXT_MUTED,
} from "@/config/general";
import { getGameResult, getGameStats, sideLabel } from "@/helpers/game";
import ActionButton, {
  PlusIcon,
  RematchIcon,
} from "@/components/UI/ActionButton";
import GameSummaryRounds from "@/components/Gameplay/GameSummaryRounds";
import { FinalScore, StatTile } from "./styled.components";

const sideColor = (type: GameSideTypes) =>
  type === "heroes" ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT;

const BANNER_STYLE = {
  heroes: {
    background: EB_HERO_BG,
    borderColor: EB_HERO_BORDER,
    labelColor: EB_TEXT_SUBTLE,
  },
  villains: {
    background: EB_VILLAIN_BG,
    borderColor: EB_VILLAIN_BORDER,
    labelColor: EB_VILLAIN_TEXT_MUTED,
  },
  draw: {
    background: EB_SURFACE,
    borderColor: EB_BORDER,
    labelColor: EB_TEXT_SUBTLE,
  },
};

const GameSummary = ({ onRestart }: { onRestart: () => void }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { sides, rounds, startNewGame } = useGameContext();
  const { winner, title, message } = getGameResult(sides);
  const stats = getGameStats(rounds);
  const { computer, player } = sides;
  const banner =
    BANNER_STYLE[winner === "draw" ? "draw" : (sides[winner].type ?? "draw")];

  // Bring the new page into view and give screen readers the result first
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const rematchHandler = () => {
    startNewGame(true);
    onRestart();
  };

  const newGameHandler = () => {
    startNewGame();
    onRestart();
  };

  const actions = (order: "top" | "bottom") => {
    const newGame = (
      <ActionButton key="new" onClick={newGameHandler} icon={<PlusIcon />}>
        New game
      </ActionButton>
    );
    const rematch = (
      <ActionButton
        key="rematch"
        variant="ghost"
        onClick={rematchHandler}
        icon={<RematchIcon />}
      >
        Rematch
      </ActionButton>
    );
    const home = (
      <ActionButton key="home" variant="ghost" to="/">
        Home
      </ActionButton>
    );

    return order === "top" ? [newGame, rematch, home] : [home, rematch, newGame];
  };

  return (
    <Stack
      data-testid="game-summary"
      sx={{
        maxWidth: "1180px",
        width: "100%",
        marginInline: "auto",
        gap: "36px",
        paddingTop: { xs: "8px", sm: "24px" },
      }}
    >
      <Stack
        component="header"
        sx={{
          alignItems: "center",
          gap: "14px",
          textAlign: "center",
          padding: { xs: "28px 16px", sm: "36px 24px" },
          borderRadius: "20px",
          backgroundColor: banner.background,
          border: `2px solid ${banner.borderColor}`,
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: { xs: "14px", sm: "16px" },
            letterSpacing: "0.24em",
            color: banner.labelColor,
          }}
        >
          {`FINAL RESULT · ${ROUND_COUNT} ROUNDS`}
        </Box>
        <Box
          component="h1"
          ref={headingRef}
          tabIndex={-1}
          sx={{
            margin: 0,
            fontFamily: EB_DISPLAY_FONT,
            fontWeight: 400,
            fontSize: "clamp(64px, 11vw, 120px)",
            lineHeight: 0.95,
            textTransform: "uppercase",
            color: EB_GOLD,
            outline: "none",
          }}
        >
          {title}
        </Box>
        <Box
          component="p"
          sx={{ margin: 0, fontSize: { xs: "17px", sm: "20px" }, color: EB_TEXT }}
        >
          {message}
        </Box>
        <Stack
          direction="row"
          data-testid="final-score"
          sx={{ alignItems: "center", gap: "28px", marginTop: "6px" }}
        >
          <FinalScore
            value={computer.score}
            label={`${computer.name} · ${sideLabel(computer.type)}`}
            color={sideColor(computer.type)}
          />
          <Box
            component="span"
            sx={{
              fontFamily: EB_DISPLAY_FONT,
              fontSize: "36px",
              color: EB_TEXT_FAINT,
            }}
          >
            –
          </Box>
          <FinalScore
            value={player.score}
            label={`${player.name} · ${sideLabel(player.type)}`}
            color={sideColor(player.type)}
          />
        </Stack>
        <Stack
          component="nav"
          aria-label="What next"
          direction="row"
          sx={{
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginTop: "18px",
          }}
        >
          {actions("top")}
        </Stack>
      </Stack>

      <Box
        component="section"
        aria-label="Match stats"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
        }}
      >
        <StatTile
          value={stats.battlesWon}
          label="Battles you won"
          color={sideColor(player.type)}
        />
        <StatTile
          value={stats.battlesLost}
          label="Battles you lost"
          color={sideColor(computer.type)}
        />
        <StatTile value={stats.draws} label="Draws" color={EB_TEXT} />
        <StatTile
          value={stats.roundsWon}
          label="Rounds you won"
          color={EB_GOLD}
        />
      </Box>

      <GameSummaryRounds />

      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          paddingTop: "8px",
        }}
      >
        {actions("bottom")}
      </Stack>
    </Stack>
  );
};

export default GameSummary;
