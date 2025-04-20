import { Stack } from "@mui/material";

export const HeaderWrapper = ({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg: string;
}) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      sx={{
        width: "100%",
        height: "64px",
        background: bg,
        paddingInline: "10px",
      }}
    >
      {children}
    </Stack>
  );
};
