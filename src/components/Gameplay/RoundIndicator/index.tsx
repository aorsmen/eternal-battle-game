import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import useGameContext from "@/hooks/useGameContext";
import { ROUND_COUNT } from "@/config/game";
import {
  EB_BORDER,
  EB_BORDER_STRONG,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_LABEL_FONT,
  EB_TEXT_SUBTLE,
  EB_WHITE_RING,
} from "@/config/general";

const RoundIndicator = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { currentRound } = useGameContext();
  const pipSize = matches ? 12 : 8;

  return (
    <Stack
      data-testid="round-indicator"
      sx={{
        alignItems: "center",
        gap: matches ? "8px" : "4px",
        paddingInline: "8px",
      }}
    >
      <Box
        component="span"
        sx={{
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: matches ? "15px" : "11px",
          letterSpacing: "0.2em",
          color: EB_TEXT_SUBTLE,
        }}
      >
        ROUND
      </Box>
      <Box
        component="span"
        sx={{
          fontFamily: EB_DISPLAY_FONT,
          fontSize: matches ? "34px" : "22px",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {currentRound + 1}{" "}
        <Box component="span" sx={{ color: EB_BORDER_STRONG }}>
          / {ROUND_COUNT}
        </Box>
      </Box>
      <Stack direction="row" sx={{ gap: "6px" }} aria-hidden="true">
        {Array.from({ length: ROUND_COUNT }, (_, i) => (
          <Box
            key={i}
            data-testid="round-pip"
            data-state={
              i < currentRound ? "done" : i === currentRound ? "now" : "next"
            }
            sx={{
              width: `${pipSize}px`,
              height: `${pipSize}px`,
              borderRadius: "999px",
              backgroundColor:
                i < currentRound
                  ? EB_GOLD
                  : i === currentRound
                    ? "#FFFFFF"
                    : EB_BORDER,
              boxShadow:
                i === currentRound ? `0 0 0 3px ${EB_WHITE_RING}` : "none",
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default RoundIndicator;
