import { styled, Typography } from "@mui/material";
import { YELLOW } from "../../config/general";

export const TitleStyle = styled(Typography)({
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "12px",
  textAlign: "center",
  color: YELLOW,
});

export const TextStyle = styled(Typography)({
  fontSize: "22px",
  marginBottom: "6px",
  textAlign: "center",
  color: "#fff",
});
