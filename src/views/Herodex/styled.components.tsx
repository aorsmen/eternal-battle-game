import { Box } from "@mui/material";
import { EB_BG, EB_BODY_FONT, EB_TEXT } from "@/config/general";

// Full-height page; the compare tray sticks to the bottom under the content
export const PageShell = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      minHeight: "100dvh",
      boxSizing: "border-box",
      background: EB_BG,
      color: EB_TEXT,
      fontFamily: EB_BODY_FONT,
      display: "flex",
      flexDirection: "column",
    }}
  >
    {children}
  </Box>
);
