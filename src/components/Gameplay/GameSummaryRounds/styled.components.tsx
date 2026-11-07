import { Box } from "@mui/material";
import { GameSideTypes } from "@/types/game.types";
import { HeroDataType } from "@/types/main.types";
import {
  EB_BG,
  EB_BORDER,
  EB_DISPLAY_FONT,
  EB_HERO,
  EB_HERO_BORDER,
  EB_HERO_TILE_BG,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_FAINT,
  EB_VILLAIN,
  EB_VILLAIN_BORDER,
  EB_VILLAIN_TILE_BG,
} from "@/config/general";

const TILE_STYLE = {
  heroes: { backgroundColor: EB_HERO_TILE_BG, borderColor: EB_HERO_BORDER },
  villains: {
    backgroundColor: EB_VILLAIN_TILE_BG,
    borderColor: EB_VILLAIN_BORDER,
  },
  draw: { backgroundColor: EB_SURFACE, borderColor: EB_BORDER },
};

const TAG_STYLE = {
  heroes: { backgroundColor: EB_HERO, color: EB_BG },
  villains: { backgroundColor: EB_VILLAIN, color: EB_BG },
  draw: { backgroundColor: EB_BORDER, color: EB_TEXT },
};

const FighterLine = ({
  card,
  color,
  isLoser,
}: {
  card: HeroDataType;
  color: string;
  isLoser: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "8px",
        minWidth: 0,
        opacity: isLoser ? 0.45 : 1,
      }}
    >
      <Box
        component="b"
        title={card.name}
        sx={{
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: "18px",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color,
        }}
      >
        {card.name}
      </Box>
      <Box
        component="span"
        sx={{
          fontFamily: EB_DISPLAY_FONT,
          fontSize: "18px",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {`${card.values.attack} / ${card.values.defense}`}
      </Box>
    </Box>
  );
};

export const BattleTile = ({
  top,
  bottom,
  winnerType,
}: {
  top: { card: HeroDataType; color: string; isLoser: boolean };
  bottom: { card: HeroDataType; color: string; isLoser: boolean };
  winnerType: GameSideTypes;
}) => {
  const key = winnerType ?? "draw";
  const label =
    winnerType === null
      ? "Draw"
      : `+1 ${winnerType === "heroes" ? "Heroes" : "Villains"}`;

  return (
    <Box
      data-testid="battle-tile"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        padding: "12px 14px",
        borderRadius: "12px",
        border: "2px solid",
        minWidth: 0,
        ...TILE_STYLE[key],
      }}
    >
      <FighterLine {...top} />
      <Box
        component="span"
        sx={{
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: "12px",
          letterSpacing: "0.2em",
          color: EB_TEXT_FAINT,
        }}
      >
        VS
      </Box>
      <FighterLine {...bottom} />
      <Box
        component="span"
        sx={{
          alignSelf: "flex-start",
          marginTop: "4px",
          borderRadius: "999px",
          padding: "4px 10px",
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          ...TAG_STYLE[key],
        }}
      >
        {label}
      </Box>
    </Box>
  );
};
