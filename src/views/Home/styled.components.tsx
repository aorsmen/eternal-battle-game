import { Box } from "@mui/material";
import { YELLOW, YELLOW_DARK } from "../../config/general";

export const LogoWrapper = ({ src }: { src: string }) => {
  return (
    <Box
      sx={{ width: "80%", maxWidth: "500px", "& img": { maxWidth: "100%" } }}
    >
      <img src={src} alt="Eternal Battle" />
    </Box>
  );
};

export const MenuItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        marginBottom: "10px",
        "& a": {
          color: YELLOW,
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "36px",
        },
        "& a:hover": {
          color: YELLOW_DARK,
        },
      }}
    >
      {children}
    </Box>
  );
};
