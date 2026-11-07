import { Box } from "@mui/material";
import {
  EB_BG,
  EB_GOLD,
  EB_GOLD_GLOW,
  EB_TEXT,
  EB_LABEL_FONT,
  EB_HERO_LIGHT,
  EB_VILLAIN_LIGHT,
  EB_HERO_BACK,
  EB_HERO_BORDER,
  EB_HERO_BACK_PATTERN,
  EB_VILLAIN_BACK,
  EB_VILLAIN_BORDER,
  EB_VILLAIN_BACK_PATTERN,
  HERO_CARD_WIDTH,
  HERO_CARD_HEIGHT,
} from "@/config/general";

const HeroMaskIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={EB_HERO_LIGHT}
    strokeWidth="1.8"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 10c0-2.2 1.8-3.5 4-3.5h12c2.2 0 4 1.3 4 3.5 0 4-2.8 7-5.8 7-2 0-3-2-4.2-2s-2.2 2-4.2 2C4.8 17 2 14 2 10z" />
  </svg>
);

const VillainHelmIcon = ({ size }: { size: number }) => (
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
  >
    <path d="M3 3l4 5h10l4-5v7.5C21 16.5 16.8 21 12 21S3 16.5 3 10.5z" />
  </svg>
);

const HeroCardBack = ({
  alignment,
  size,
  testId,
  revealable = false,
}: {
  alignment: "good" | "bad";
  size: "sm" | "lg";
  testId?: string;
  revealable?: boolean;
}) => {
  const isHero = alignment === "good";
  const pattern = isHero ? EB_HERO_BACK_PATTERN : EB_VILLAIN_BACK_PATTERN;
  const stripes = (angle: number) =>
    `repeating-linear-gradient(${angle}deg, ${pattern} 0 2px, transparent 2px 16px)`;
  const emblemSize = size === "lg" ? 64 : 44;
  const iconSize = size === "lg" ? 34 : 24;

  return (
    <Box
      data-testid={testId}
      sx={{
        width: `${HERO_CARD_WIDTH[size]}px`,
        height: `${HERO_CARD_HEIGHT[size]}px`,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        borderRadius: size === "lg" ? "14px" : "10px",
        border: `2px solid ${isHero ? EB_HERO_BORDER : EB_VILLAIN_BORDER}`,
        backgroundColor: isHero ? EB_HERO_BACK : EB_VILLAIN_BACK,
        backgroundImage: `${stripes(45)}, ${stripes(-45)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "box-shadow 0.2s ease",
        ...(revealable && {
          cursor: "pointer",
          "&:hover, :focus-visible > &": {
            boxShadow: `0 0 0 4px ${EB_GOLD}, 0 0 28px ${EB_GOLD_GLOW}`,
          },
          "&:hover .reveal-hint, :focus-visible > & .reveal-hint": {
            opacity: 1,
          },
          ":focus-visible > &::after": {
            content: '""',
            position: "absolute",
            inset: "4px",
            borderRadius: size === "lg" ? "10px" : "7px",
            outline: `3px solid ${EB_TEXT}`,
            pointerEvents: "none",
          },
        }),
      }}
    >
      {revealable && (
        <Box
          className="reveal-hint"
          component="span"
          sx={{
            position: "absolute",
            left: "50%",
            bottom: size === "lg" ? "14px" : "10px",
            transform: "translateX(-50%)",
            opacity: 0,
            transition: "opacity 0.2s ease",
            backgroundColor: EB_GOLD,
            color: EB_BG,
            borderRadius: "999px",
            padding: size === "lg" ? "8px 14px" : "5px 10px",
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: size === "lg" ? "15px" : "12px",
            letterSpacing: "0.1em",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          REVEAL
        </Box>
      )}
      <Box
        sx={{
          width: `${emblemSize}px`,
          height: `${emblemSize}px`,
          borderRadius: "999px",
          backgroundColor: EB_BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isHero ? (
          <HeroMaskIcon size={iconSize} />
        ) : (
          <VillainHelmIcon size={iconSize} />
        )}
      </Box>
    </Box>
  );
};

export default HeroCardBack;
