import { Box, Stack } from "@mui/material";
import {
  EB_BG,
  EB_BODY_FONT,
  EB_BORDER,
  EB_GOLD,
  EB_GOLD_LIGHT,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_SUBTLE,
} from "@/config/general";

// Sits above the compare tray and MUI dialogs (z-index 1300)
export const PromptWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    role="status"
    sx={{
      position: "fixed",
      zIndex: 1400,
      right: { xs: "16px", sm: "24px" },
      left: { xs: "16px", sm: "auto" },
      bottom: "calc(24px + env(safe-area-inset-bottom))",
      maxWidth: { sm: "380px" },
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      padding: "16px 18px",
      borderRadius: "14px",
      background: EB_SURFACE,
      border: `2px solid ${EB_GOLD}`,
      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.55)",
      color: EB_TEXT,
      fontFamily: EB_BODY_FONT,
    }}
  >
    {children}
  </Box>
);

export const PromptText = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => (
  <Stack sx={{ gap: "4px" }}>
    <Box
      component="strong"
      sx={{
        fontFamily: EB_LABEL_FONT,
        fontWeight: 700,
        fontSize: "18px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: EB_GOLD,
      }}
    >
      {title}
    </Box>
    <Box component="span" sx={{ fontSize: "15px", color: EB_TEXT_SUBTLE }}>
      {text}
    </Box>
  </Stack>
);

export const PromptActions = ({ children }: { children: React.ReactNode }) => (
  <Stack direction="row" sx={{ gap: "10px", justifyContent: "flex-end" }}>
    {children}
  </Stack>
);

export const PromptButton = ({
  primary = false,
  onClick,
  children,
}: {
  primary?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Box
    component="button"
    type="button"
    onClick={onClick}
    sx={{
      appearance: "none",
      cursor: "pointer",
      minHeight: "44px",
      padding: "0 18px",
      borderRadius: "10px",
      border: primary ? 0 : `2px solid ${EB_BORDER}`,
      background: primary ? EB_GOLD : "transparent",
      color: primary ? EB_BG : EB_TEXT,
      fontFamily: EB_LABEL_FONT,
      fontWeight: 700,
      fontSize: "17px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      "&:hover": primary
        ? { background: EB_GOLD_LIGHT }
        : { borderColor: EB_GOLD, color: "#FFFFFF" },
      "&:focus-visible": {
        outline: "3px solid #FFFFFF",
        outlineOffset: "3px",
      },
    }}
  >
    {children}
  </Box>
);
