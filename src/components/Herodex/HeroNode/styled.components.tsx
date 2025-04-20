import { Stack } from "@mui/material";
import { VILLAIN_RED_DARK, HERO_BLUE_DARK } from "../../../config/general";

export const HeroNodeWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Stack
      sx={{
        width: "270px",
        height: "370px",
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
