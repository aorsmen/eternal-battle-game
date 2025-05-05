import { styled, Box } from "@mui/material";
import { HERO_CARD_WIDTH } from "../../../config/general";

export const SideHandGrid = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: `repeat(5, ${HERO_CARD_WIDTH.lg}px)`,
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: `repeat(5, ${HERO_CARD_WIDTH.sm}px)`,
  },
  display: "grid",
  gap: "16px",
  marginBlock: "30px",
}));
