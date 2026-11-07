import { styled, Box } from "@mui/material";

export const BoardWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1414px",
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  [theme.breakpoints.down("lg")]: {
    gap: "12px",
  },
}));
