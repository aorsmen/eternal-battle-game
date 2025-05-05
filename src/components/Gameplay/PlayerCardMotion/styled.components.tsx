import { ButtonBase, Box, styled } from "@mui/material";
import { HERO_CARD_WIDTH, HERO_CARD_HEIGHT } from "../../../config/general";

export const CardSpot = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.up("lg")]: {
    height: `${HERO_CARD_HEIGHT.lg}px`,
    width: `${HERO_CARD_WIDTH.lg}px`,
  },
  [theme.breakpoints.down("lg")]: {
    height: `${HERO_CARD_HEIGHT.sm}px`,
    width: `${HERO_CARD_WIDTH.sm}px`,
  },
}));

export const HeroCardBack = ({
  alignment,
  size,
}: {
  alignment: "good" | "bad";
  size: "sm" | "lg";
}) => {
  return (
    <Box
      className={`card-back${alignment === "good" ? " hero" : " villain"}`}
      sx={{
        width: `${HERO_CARD_WIDTH[size]}px`,
        height: `${HERO_CARD_HEIGHT[size]}px`,
        borderRadius: "5px",
      }}
      data-testid="player-card-back"
    ></Box>
  );
};
