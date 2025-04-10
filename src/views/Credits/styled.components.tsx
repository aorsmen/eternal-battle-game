import { styled, Typography, Box } from "@mui/material";
import { YELLOW } from "../../config/general";

export const TitleStyle = styled(Typography)({
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "12px",
  textAlign: "center",
  color: YELLOW,
});

export const TextStyle = styled(Typography)({
  fontSize: "28x",
  marginBottom: "6px",
  textAlign: "center",
  color: "#fff",
});

export const SectionStyle = styled(Box)({
  margin: "32px auto 0",
});
