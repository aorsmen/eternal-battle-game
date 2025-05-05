import { Stack } from "@mui/material";
import {
  VILLAIN_RED_DARK,
  HERO_BLUE_DARK,
  HERO_CARD_WIDTH,
  HERO_CARD_HEIGHT,
} from "../../../config/general";

export const HeroNodeWrapper = ({
  children,
  size,
}: {
  children: React.ReactNode;
  size: "sm" | "lg";
}) => {
  return (
    <Stack
      sx={{
        width: `${HERO_CARD_WIDTH[size]}px`,
        height: `${HERO_CARD_HEIGHT[size]}px`,
        position: "relative",
      }}
    >
      {children}
    </Stack>
  );
};

export const HeroNodeToolbar = ({
  children,
  alignment,
}: {
  children: React.ReactNode;
  alignment: "good" | "bad";
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        transform: "translateY(calc(-100% - 5px))",
        background: alignment === "good" ? HERO_BLUE_DARK : VILLAIN_RED_DARK,
        borderRadius: "3px",
      }}
    >
      {children}
    </Stack>
  );
};
