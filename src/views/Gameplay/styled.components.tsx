import { styled, Box } from "@mui/material";
import { EB_BG, EB_BODY_FONT, EB_TEXT } from "@/config/general";

export const GameWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100dvh",
  boxSizing: "border-box",
  // Clips the cards' fly-in animation without blocking vertical page scroll
  overflow: "hidden",
  background: EB_BG,
  color: EB_TEXT,
  fontFamily: EB_BODY_FONT,
  padding: "24px 24px 40px",
  [theme.breakpoints.down("lg")]: {
    padding: "12px 8px 24px",
  },
}));
