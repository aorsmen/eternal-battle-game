import { styled, Box } from "@mui/material";

export const SideHandGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(5, 270px)",
  gap: "16px",
  marginBlock: "30px",
});
