import { Stack } from "@mui/material";
import { HEADER_HEIGHT } from "../../../../config/general";

export const HeaderWrapper = ({
  children,
  bg,
  size,
}: {
  children: React.ReactNode;
  bg: string;
  size: "sm" | "lg";
}) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      sx={{
        width: "100%",
        height: `${HEADER_HEIGHT[size]}px`,
        background: bg,
        paddingInline: "10px",
      }}
    >
      {children}
    </Stack>
  );
};
