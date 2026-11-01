import { Box, Stack } from "@mui/material";
import {
  EB_BG,
  EB_BORDER,
  EB_GOLD,
  EB_GOLD_LIGHT,
  EB_HERO,
  EB_HERO_BG,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_DISPLAY_FONT,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_MUTED,
  EB_VILLAIN,
  EB_VILLAIN_BG,
  EB_VILLAIN_LIGHT,
} from "@/config/general";

export const HomeBackground = () => {
  return (
    <>
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        <Box sx={{ background: EB_HERO_BG }} />
        <Box sx={{ background: EB_VILLAIN_BG }} />
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          left: "50%",
          top: "-10%",
          bottom: "-10%",
          width: "6px",
          background: EB_GOLD,
          transform: "translateX(-50%) rotate(8deg)",
          opacity: 0.85,
        }}
      />
    </>
  );
};

export const VersusEmblem = () => {
  return (
    <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true">
      <path d="M56 6 L106 56 L56 106 Z" fill={EB_VILLAIN} />
      <path d="M56 6 L6 56 L56 106 Z" fill={EB_HERO} />
      <path
        d="M56 6 L106 56 L56 106 L6 56 Z"
        fill="none"
        stroke={EB_GOLD}
        strokeWidth="4"
      />
      <text
        x="56"
        y="70"
        textAnchor="middle"
        fontFamily={EB_DISPLAY_FONT}
        fontSize="38"
        fill={EB_BG}
      >
        VS
      </text>
    </svg>
  );
};

export const HomeTitle = () => {
  return (
    <Box
      component="h1"
      sx={{
        margin: 0,
        fontFamily: EB_DISPLAY_FONT,
        fontWeight: 400,
        fontSize: "clamp(56px, 10vw, 128px)",
        lineHeight: 0.92,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      <Box component="span" sx={{ color: EB_HERO_LIGHT }}>
        Eternal
      </Box>
      <br />
      <Box component="span" sx={{ color: EB_VILLAIN_LIGHT }}>
        Battle
      </Box>
    </Box>
  );
};

export const HomeMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      component="nav"
      aria-label="Main menu"
      sx={{
        width: "100%",
        maxWidth: "420px",
        gap: "14px",
        "& a": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          minHeight: "64px",
          padding: "0 28px",
          borderRadius: "12px",
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: "26px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textDecoration: "none",
          border: `2px solid ${EB_BORDER}`,
          color: EB_TEXT,
          background: EB_SURFACE,
        },
        "& a:hover": {
          borderColor: EB_GOLD,
          color: "#FFFFFF",
        },
        "& a.primary": {
          background: EB_GOLD,
          borderColor: EB_GOLD,
          color: EB_BG,
        },
        "& a.primary:hover": {
          background: EB_GOLD_LIGHT,
          borderColor: EB_GOLD_LIGHT,
          color: EB_BG,
        },
      }}
    >
      {children}
    </Stack>
  );
};

const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const MenuIcon = ({ link }: { link: string }) => {
  if (link === "/battle") {
    return (
      <svg {...iconProps} strokeWidth={2.2}>
        <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
        <path d="M13 19l6-6" />
        <path d="M16 16l4 4" />
        <path d="M19 21l2-2" />
      </svg>
    );
  }

  if (link === "/herodex") {
    return (
      <svg {...iconProps}>
        <rect x="3" y="4" width="7" height="16" rx="1.5" />
        <rect x="14" y="4" width="7" height="16" rx="1.5" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />
    </svg>
  );
};

export const HomeTagline = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="p"
      sx={{
        margin: 0,
        fontFamily: EB_LABEL_FONT,
        fontWeight: 600,
        fontSize: "20px",
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: EB_TEXT_MUTED,
      }}
    >
      {children}
    </Box>
  );
};
