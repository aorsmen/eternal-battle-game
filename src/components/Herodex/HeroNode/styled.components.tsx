import { Stack } from "@mui/material";
import { BROWN } from "../../../config/general";

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
}: {
  children: React.ReactNode;
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
        background: BROWN,
        borderRadius: "3px",
      }}
    >
      {children}
    </Stack>
  );
};
