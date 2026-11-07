import { useEffect, useRef } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import useGameContext from "@/hooks/useGameContext";
import { GameSideTypes } from "@/types/game.types";
import {
  ROUND_COUNT,
  ROUND_DRAW_TITLE,
  ROUND_PLAYER_WIN_TITLE,
  ROUND_WIN_TITLE,
} from "@/config/game";
import {
  EB_BORDER_STRONG,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_TEXT,
  EB_TEXT_SUBTLE,
  EB_VILLAIN_LIGHT,
} from "@/config/general";
import {
  BattleChip,
  BattleChipVariant,
} from "@/components/Gameplay/SingleBattle/styled.components";
import ActionButton, { ArrowIcon } from "@/components/UI/ActionButton";
import { sideLabel } from "@/helpers/game";
import { RowsHeader, BattleRow } from "./styled.components";

const sideColor = (type: GameSideTypes) =>
  type === "heroes" ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT;

const RoundSummary = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { sides, rounds, currentRound, roundWinner, goToNextRound } =
    useGameContext();
  const battles = rounds[currentRound]?.battles ?? [];
  const computerWins = battles.filter((b) => b.winner === "computer").length;
  const playerWins = battles.filter((b) => b.winner === "player").length;
  const computer = sides.computer;
  const player = sides.player;
  const roundNumber = currentRound + 1;

  let title = ROUND_DRAW_TITLE;
  let titleColor = EB_TEXT;

  if (roundWinner === "player") {
    title = ROUND_PLAYER_WIN_TITLE;
    titleColor = sideColor(player.type);
  } else if (roundWinner === "computer") {
    title = ROUND_WIN_TITLE.replace("{WINNER}", computer.name);
    titleColor = sideColor(computer.type);
  }

  // Bring the new page into view and give screen readers the result first
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const scoreBlock = (value: number, name: string, color: string) => (
    <Stack sx={{ alignItems: "center", minWidth: 0 }}>
      <Box
        component="span"
        sx={{
          fontFamily: EB_DISPLAY_FONT,
          fontSize: { xs: "48px", sm: "64px" },
          lineHeight: 1,
          color,
        }}
      >
        {value}
      </Box>
      <Box
        component="span"
        sx={{
          fontSize: "14px",
          color: EB_TEXT_SUBTLE,
          maxWidth: "160px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </Box>
    </Stack>
  );

  return (
    <Stack
      data-testid="round-summary"
      sx={{
        maxWidth: "860px",
        width: "100%",
        marginInline: "auto",
        gap: { xs: "24px", sm: "32px" },
        paddingTop: { xs: "8px", sm: "24px" },
      }}
    >
      <Stack
        component="header"
        sx={{ alignItems: "center", gap: "12px", textAlign: "center" }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: { xs: "14px", sm: "16px" },
            letterSpacing: "0.24em",
            color: EB_TEXT_SUBTLE,
          }}
        >
          {`ROUND ${roundNumber} OF ${ROUND_COUNT} COMPLETE`}
        </Box>
        <Box
          component="h1"
          ref={headingRef}
          tabIndex={-1}
          sx={{
            margin: 0,
            fontFamily: EB_DISPLAY_FONT,
            fontWeight: 400,
            fontSize: "clamp(36px, 7vw, 72px)",
            lineHeight: 1,
            textTransform: "uppercase",
            color: titleColor,
            outline: "none",
          }}
        >
          {title}
        </Box>
        <Stack
          direction="row"
          data-testid="round-summary-score"
          sx={{ alignItems: "center", gap: "24px", marginTop: "8px" }}
        >
          {scoreBlock(computerWins, computer.name, sideColor(computer.type))}
          <Box
            component="span"
            sx={{
              fontFamily: EB_DISPLAY_FONT,
              fontSize: "32px",
              color: EB_BORDER_STRONG,
            }}
          >
            –
          </Box>
          {scoreBlock(playerWins, player.name, sideColor(player.type))}
        </Stack>
      </Stack>

      <Stack
        component="section"
        aria-label="Battles this round"
        sx={{ gap: "10px" }}
      >
        <RowsHeader
          left={{
            label: sideLabel(computer.type),
            color: sideColor(computer.type),
          }}
          right={{
            label: sideLabel(player.type),
            color: sideColor(player.type),
          }}
        />
        {battles.map((battle, index) => {
          const winnerType =
            battle.winner === "draw" ? null : sides[battle.winner].type;
          const variant: BattleChipVariant = winnerType ?? "draw";
          const label =
            winnerType === null ? "Draw" : `+1 ${sideLabel(winnerType)}`;

          return (
            <BattleRow
              key={index}
              left={{
                card: battle.cards.computer,
                color: sideColor(computer.type),
                isLoser: battle.winner === "player",
              }}
              right={{
                card: battle.cards.player,
                color: sideColor(player.type),
                isLoser: battle.winner === "computer",
              }}
              result={
                <BattleChip
                  variant={variant}
                  label={label}
                  isMobile={!matches}
                />
              }
            />
          );
        })}
      </Stack>

      <Box
        component="section"
        aria-label="Match score"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          padding: { xs: "16px 18px", sm: "20px 24px" },
          borderRadius: "14px",
          border: `2px solid ${EB_GOLD}`,
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: { xs: "15px", sm: "18px" },
            letterSpacing: "0.16em",
            color: EB_GOLD,
          }}
        >
          {`MATCH SCORE AFTER ${roundNumber} ROUND${roundNumber === 1 ? "" : "S"}`}
        </Box>
        <Box
          component="span"
          data-testid="match-score"
          sx={{ fontFamily: EB_DISPLAY_FONT, fontSize: "36px", lineHeight: 1 }}
        >
          <Box component="span" sx={{ color: sideColor(computer.type) }}>
            {computer.score}
          </Box>{" "}
          <Box component="span" sx={{ color: EB_BORDER_STRONG }}>
            –
          </Box>{" "}
          <Box component="span" sx={{ color: sideColor(player.type) }}>
            {player.score}
          </Box>
        </Box>
      </Box>

      <Stack
        direction="row"
        sx={{ justifyContent: "center", gap: "16px", flexWrap: "wrap" }}
      >
        <ActionButton variant="ghost" to="/">
          Quit
        </ActionButton>
        <ActionButton onClick={goToNextRound} icon={<ArrowIcon />}>
          Next round
        </ActionButton>
      </Stack>
    </Stack>
  );
};

export default RoundSummary;
