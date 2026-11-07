import { Box, Stack } from "@mui/material";
import { Link } from "react-router";
import { CreditsPageContentType } from "@/types/pages.types";
import VersusEmblem from "@/components/UI/VersusEmblem";
import {
  EB_BG,
  EB_BODY_FONT,
  EB_BORDER,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_GOLD_LIGHT,
  EB_HERO_BG,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_MUTED,
  EB_VILLAIN_BG,
} from "@/config/general";

const BAND_HEIGHT = "420px";

const FOCUS_RING = {
  "&:focus-visible": {
    outline: "3px solid #FFFFFF",
    outlineOffset: "3px",
  },
} as const;

const BLOCK = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  textAlign: "center",
} as const;

// Hero blue / villain red band across the top, edged in gold
const CreditsBackground = () => (
  <>
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: "0 0 auto 0",
        height: BAND_HEIGHT,
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
        left: 0,
        right: 0,
        top: BAND_HEIGHT,
        height: "3px",
        background: EB_GOLD,
      }}
    />
  </>
);

export const CreditsMain = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="main"
    sx={{
      minHeight: "100dvh",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      background: EB_BG,
      color: EB_TEXT,
      fontFamily: EB_BODY_FONT,
    }}
  >
    <CreditsBackground />
    <Box sx={{ position: "relative", padding: "28px 24px 64px" }}>
      <Stack
        sx={{
          maxWidth: "960px",
          marginInline: "auto",
          gap: { xs: "48px", sm: "64px" },
        }}
      >
        {children}
      </Stack>
    </Box>
  </Box>
);

export const CreditsHeader = () => (
  <Box component="header" sx={{ ...BLOCK, gap: "20px", paddingTop: "8px" }}>
    <VersusEmblem size={96} />
    <Box
      component="h1"
      sx={{
        margin: 0,
        fontFamily: EB_DISPLAY_FONT,
        fontWeight: 400,
        fontSize: "clamp(64px, 10vw, 112px)",
        lineHeight: 0.92,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      Credits
    </Box>
    <Box
      component="p"
      sx={{
        margin: 0,
        fontFamily: EB_LABEL_FONT,
        fontWeight: 600,
        fontSize: "19px",
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: EB_TEXT_MUTED,
      }}
    >
      The team behind the battle
    </Box>
  </Box>
);

const SectionTitle = ({ id, children }: { id: string; children: string }) => (
  <Box
    component="h2"
    id={id}
    sx={{
      margin: 0,
      fontFamily: EB_LABEL_FONT,
      fontWeight: 700,
      fontSize: "17px",
      letterSpacing: "0.24em",
      color: EB_GOLD,
      textTransform: "uppercase",
    }}
  >
    {children}
  </Box>
);

const PersonName = ({ children }: { children: string }) => (
  <Box
    component="p"
    sx={{
      margin: 0,
      fontFamily: EB_DISPLAY_FONT,
      fontWeight: 400,
      fontSize: "clamp(40px, 5vw, 60px)",
      lineHeight: 1,
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      color: "#FFFFFF",
    }}
  >
    {children}
  </Box>
);

const TagList = ({ tags }: { tags: string[] }) => (
  <Box
    component="ul"
    sx={{
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "12px",
      maxWidth: "760px",
    }}
  >
    {tags.map((tag) => (
      <Box
        component="li"
        key={tag}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          height: "48px",
          padding: "0 20px",
          borderRadius: "12px",
          background: EB_SURFACE,
          border: `2px solid ${EB_BORDER}`,
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: "20px",
          letterSpacing: "0.04em",
          color: EB_TEXT,
        }}
      >
        {tag}
      </Box>
    ))}
  </Box>
);

export const CreditsSection = ({
  section,
}: {
  section: CreditsPageContentType;
}) => {
  const titleId = `credits-${section.id}`;

  return (
    <Box component="section" aria-labelledby={titleId} sx={BLOCK}>
      <SectionTitle id={titleId}>{section.title}</SectionTitle>
      {section.type === "tags" ? (
        <TagList tags={section.text} />
      ) : (
        section.text.map((name) => <PersonName key={name}>{name}</PersonName>)
      )}
    </Box>
  );
};

export const SectionDivider = () => (
  <Box
    aria-hidden="true"
    sx={{
      alignSelf: "center",
      width: "120px",
      height: "3px",
      borderRadius: "2px",
      background: EB_BORDER,
    }}
  />
);

export const CreditsActions = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="section"
    aria-label="Source code and navigation"
    sx={{
      display: "flex",
      gap: "14px",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingTop: "16px",
    }}
  >
    {children}
  </Box>
);

const BUTTON_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  gap: "12px",
  minHeight: "56px",
  padding: "0 28px",
  boxSizing: "border-box",
  borderRadius: "12px",
  textDecoration: "none",
  fontFamily: EB_LABEL_FONT,
  fontWeight: 700,
  fontSize: "21px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  ...FOCUS_RING,
} as const;

// Opens in a new tab; the hidden text tells screen reader users so
export const SourceLink = ({ href }: { href: string }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      ...BUTTON_STYLE,
      border: `2px solid ${EB_BORDER}`,
      color: EB_TEXT,
      "&:hover": { borderColor: EB_GOLD, color: "#FFFFFF" },
    }}
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 7l-5 5 5 5" />
      <path d="M16 7l5 5-5 5" />
      <path d="M14 4l-4 16" />
    </svg>
    Source on GitHub
    <Box
      component="span"
      sx={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
      }}
    >
      (opens in a new tab)
    </Box>
  </Box>
);

export const PlayLink = ({ to }: { to: string }) => (
  <Box
    component={Link}
    to={to}
    sx={{
      ...BUTTON_STYLE,
      background: EB_GOLD,
      color: EB_BG,
      "&:hover": { background: EB_GOLD_LIGHT, color: EB_BG },
    }}
  >
    Play now
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  </Box>
);
