import { Box } from "@mui/material";
import {
  EB_BG,
  EB_BORDER,
  EB_BORDER_STRONG,
  EB_DISPLAY_FONT,
  EB_HERO,
  EB_LABEL_FONT,
  EB_TEXT,
  EB_VILLAIN,
} from "@/config/general";

export type BattleChipVariant = "wait" | "heroes" | "villains" | "draw";

const VARIANT_STYLES: Record<BattleChipVariant, object> = {
  wait: { color: EB_BORDER_STRONG },
  heroes: { backgroundColor: EB_HERO, color: EB_BG },
  villains: { backgroundColor: EB_VILLAIN, color: EB_BG },
  draw: { backgroundColor: EB_BORDER, color: EB_TEXT },
};

export const BattleChip = ({
  variant,
  label,
  isMobile,
}: {
  variant: BattleChipVariant;
  label: string;
  isMobile: boolean;
}) => {
  const isWaiting = variant === "wait";

  return (
    <Box
      data-testid="battle-chip"
      data-variant={variant}
      aria-live="polite"
      sx={{
        height: isMobile ? "30px" : "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "999px",
        whiteSpace: "nowrap",
        textTransform: "uppercase",
        ...(isWaiting
          ? {
              fontFamily: EB_DISPLAY_FONT,
              fontSize: isMobile ? "18px" : "26px",
              letterSpacing: "0.02em",
            }
          : {
              fontFamily: EB_LABEL_FONT,
              fontWeight: 700,
              fontSize: isMobile ? "12px" : "16px",
              letterSpacing: "0.08em",
            }),
        ...VARIANT_STYLES[variant],
      }}
    >
      {label}
    </Box>
  );
};
