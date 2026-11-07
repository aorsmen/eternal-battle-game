import { ButtonBase, styled } from "@mui/material";
import { HERO_CARD_WIDTH, HERO_CARD_HEIGHT } from "@/config/general";

export const CardSpot = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.up("lg")]: {
    height: `${HERO_CARD_HEIGHT.lg}px`,
    width: `${HERO_CARD_WIDTH.lg}px`,
    borderRadius: "14px",
  },
  [theme.breakpoints.down("lg")]: {
    height: `${HERO_CARD_HEIGHT.sm}px`,
    width: `${HERO_CARD_WIDTH.sm}px`,
    borderRadius: "10px",
  },
}));
