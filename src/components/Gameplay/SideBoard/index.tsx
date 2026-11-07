import { useEffect, useRef } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import gsap from "gsap";
import { SCORE_ANIMATION_MS } from "@/config/game";
import { GameSidesItemType, HandSidesType } from "@/types/game.types";
import {
  EB_DISPLAY_FONT,
  EB_HERO_BORDER,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT_SUBTLE,
  EB_VILLAIN_BORDER,
  EB_VILLAIN_LIGHT,
  EB_VILLAIN_TEXT_MUTED,
} from "@/config/general";

const SideIcon = ({ isHero, size }: { isHero: boolean; size: number }) =>
  isHero ? (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={EB_HERO_LIGHT}
      strokeWidth="1.8"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      <path d="M2 10c0-2.2 1.8-3.5 4-3.5h12c2.2 0 4 1.3 4 3.5 0 4-2.8 7-5.8 7-2 0-3-2-4.2-2s-2.2 2-4.2 2C4.8 17 2 14 2 10z" />
      <ellipse cx="7.5" cy="11" rx="2" ry="1.4" />
      <ellipse cx="16.5" cy="11" rx="2" ry="1.4" />
    </svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={EB_VILLAIN_LIGHT}
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      <path d="M3 3l4 5h10l4-5v7.5C21 16.5 16.8 21 12 21S3 16.5 3 10.5z" />
      <path d="M7.5 12.5l3 1.2" />
      <path d="M16.5 12.5l-3 1.2" />
    </svg>
  );

const SideBoard = ({
  side,
  data,
  onComplete,
}: {
  side: HandSidesType;
  data: GameSidesItemType;
  onComplete?: () => void;
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { name, score, type, lastScore } = data;
  const pointRef = useRef(null);
  const isHero = type === "heroes";
  const isPlayer = side === "player";
  const accent = isHero ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT;
  const scoreHasChanged = lastScore !== null && lastScore > 0;

  useEffect(() => {
    if (scoreHasChanged) {
      gsap.fromTo(
        pointRef.current,
        { x: 0, opacity: 1, scale: 1 },
        {
          x: side === "computer" ? 48 : -48,
          scale: 1.5,
          opacity: 0,
          duration: SCORE_ANIMATION_MS / 1000,
          ease: "power2.out",
          onComplete,
        }
      );
    }
  }, [onComplete, scoreHasChanged, side]);

  if (type === null) {
    return null;
  }

  return (
    <Box
      data-testid={`${side}-plate`}
      sx={{
        display: "flex",
        flexDirection: isPlayer ? "row-reverse" : "row",
        alignItems: "center",
        gap: matches ? "14px" : "8px",
        padding: matches ? "12px 18px" : "8px 10px",
        minWidth: 0,
        borderRadius: matches ? "14px" : "10px",
        backgroundColor: EB_SURFACE,
        border: `2px solid ${isHero ? EB_HERO_BORDER : EB_VILLAIN_BORDER}`,
        textAlign: isPlayer ? "right" : "left",
      }}
    >
      <SideIcon isHero={isHero} size={matches ? 36 : 24} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          flex: 1,
        }}
      >
        <Box
          component="span"
          title={name}
          sx={{
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: matches ? "22px" : "16px",
            letterSpacing: "0.04em",
            lineHeight: 1.15,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Box>
        <Box
          component="span"
          sx={{
            fontSize: matches ? "13px" : "11px",
            color: isHero ? EB_TEXT_SUBTLE : EB_VILLAIN_TEXT_MUTED,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${isHero ? "Heroes" : "Villains"} · ${isPlayer ? "You" : "Opponent"}`}
        </Box>
      </Box>
      <Box sx={{ position: "relative", flex: "none" }}>
        <Box
          component="span"
          data-testid={`${side}-score`}
          sx={{
            fontFamily: EB_DISPLAY_FONT,
            fontSize: matches ? "40px" : "26px",
            lineHeight: 1,
            color: accent,
          }}
        >
          {score}
        </Box>
        {scoreHasChanged && (
          <Box
            ref={pointRef}
            component="span"
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              fontFamily: EB_DISPLAY_FONT,
              fontSize: matches ? "28px" : "18px",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: accent,
              pointerEvents: "none",
            }}
          >{`+${lastScore}`}</Box>
        )}
      </Box>
    </Box>
  );
};

export default SideBoard;
