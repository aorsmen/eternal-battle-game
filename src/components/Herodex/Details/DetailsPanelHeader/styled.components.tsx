import { Stack } from "@mui/material";
import { BROWN } from "../../../../config/general";

export const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      sx={{
        width: "100%",
        height: "64px",
        background: BROWN,
        paddingInline: "10px",
      }}
    >
      {children}
    </Stack>
  );
};
