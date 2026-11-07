import { Box, Stack } from "@mui/material";
import {
  EB_BG,
  EB_BODY_FONT,
  EB_BORDER,
  EB_BORDER_STRONG,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_GOLD_LIGHT,
  EB_HERO,
  EB_HERO_BG,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_MUTED,
  EB_VILLAIN,
  EB_VILLAIN_BG,
  EB_VILLAIN_LIGHT,
  EB_VILLAIN_TEXT_MUTED,
} from "@/config/general";

export const PageHeader = () => {
  return (
    <Stack component="header" sx={{ textAlign: "center", gap: "10px" }}>
      <Box
        component="h1"
        sx={{
          margin: 0,
          fontFamily: EB_DISPLAY_FONT,
          fontWeight: 400,
          fontSize: "clamp(40px, 6vw, 64px)",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
        }}
      >
        Choose your side
      </Box>
      <Box
        component="p"
        sx={{ margin: 0, fontSize: "18px", color: EB_TEXT_MUTED }}
      >
        Your opponent takes the other deck. Five rounds, five cards each.
      </Box>
    </Stack>
  );
};

export const NameField = ({
  value,
  error,
  onChange,
}: {
  value: string;
  error: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Stack
      sx={{
        gap: "8px",
        maxWidth: "420px",
        width: "100%",
        marginInline: "auto",
      }}
    >
      <Box
        component="label"
        htmlFor="player-name"
        sx={{
          fontFamily: EB_LABEL_FONT,
          fontWeight: 600,
          fontSize: "16px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: EB_TEXT_MUTED,
        }}
      >
        Player name
      </Box>
      <Box
        component="input"
        id="player-name"
        type="text"
        placeholder="Enter your name"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        aria-invalid={error !== ""}
        aria-describedby={error ? "player-name-error" : undefined}
        sx={{
          height: "56px",
          boxSizing: "border-box",
          padding: "0 18px",
          borderRadius: "12px",
          border: `2px solid ${error ? EB_VILLAIN : EB_BORDER}`,
          background: EB_SURFACE,
          color: EB_TEXT,
          fontFamily: EB_BODY_FONT,
          fontSize: "20px",
          "&:focus": { outline: `3px solid ${EB_GOLD}`, outlineOffset: "2px" },
        }}
      />
      {error && (
        <Box
          component="span"
          id="player-name-error"
          sx={{ color: EB_VILLAIN_LIGHT, fontSize: "15px" }}
        >
          {error}
        </Box>
      )}
    </Stack>
  );
};

const SIDE_STYLES = {
  heroes: {
    background: EB_HERO_BG,
    accent: EB_HERO,
    title: EB_HERO_LIGHT,
    text: EB_TEXT_MUTED,
    ring: "rgba(61, 139, 255, 0.25)",
  },
  villains: {
    background: EB_VILLAIN_BG,
    accent: EB_VILLAIN,
    title: EB_VILLAIN_LIGHT,
    text: EB_VILLAIN_TEXT_MUTED,
    ring: "rgba(255, 77, 94, 0.25)",
  },
};

const SideIcon = ({ side }: { side: "heroes" | "villains" }) => {
  if (side === "heroes") {
    return (
      <svg
        width="88"
        height="88"
        viewBox="0 0 24 24"
        fill="none"
        stroke={EB_HERO_LIGHT}
        strokeWidth="1.6"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 10c0-2.2 1.8-3.5 4-3.5h12c2.2 0 4 1.3 4 3.5 0 4-2.8 7-5.8 7-2 0-3-2-4.2-2s-2.2 2-4.2 2C4.8 17 2 14 2 10z" />
        <ellipse cx="7.5" cy="11" rx="2" ry="1.4" />
        <ellipse cx="16.5" cy="11" rx="2" ry="1.4" />
      </svg>
    );
  }

  return (
    <svg
      width="88"
      height="88"
      viewBox="0 0 24 24"
      fill="none"
      stroke={EB_VILLAIN_LIGHT}
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 3l4 5h10l4-5v7.5C21 16.5 16.8 21 12 21S3 16.5 3 10.5z" />
      <path d="M7.5 12.5l3 1.2" />
      <path d="M16.5 12.5l-3 1.2" />
    </svg>
  );
};

export const SideCard = ({
  side,
  title,
  description,
  selected,
  onSelect,
}: {
  side: "heroes" | "villains";
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) => {
  const style = SIDE_STYLES[side];

  return (
    <Box
      component="button"
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      sx={{
        appearance: "none",
        font: "inherit",
        color: EB_TEXT,
        textAlign: "left",
        cursor: "pointer",
        borderRadius: "18px",
        border: `3px solid ${selected ? style.accent : EB_BORDER}`,
        boxShadow: selected ? `0 0 0 6px ${style.ring}` : "none",
        background: style.background,
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        minHeight: "340px",
        position: "relative",
        "&:hover": {
          borderColor: selected ? style.accent : EB_BORDER_STRONG,
        },
        "&:focus-visible": {
          outline: `3px solid ${EB_GOLD}`,
          outlineOffset: "4px",
        },
      }}
    >
      {selected && (
        <Box
          component="span"
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: style.accent,
            color: EB_BG,
            borderRadius: "999px",
            padding: "6px 12px",
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: "15px",
            letterSpacing: "0.1em",
          }}
        >
          SELECTED
        </Box>
      )}
      <SideIcon side={side} />
      <Box
        component="span"
        sx={{
          fontFamily: EB_DISPLAY_FONT,
          fontSize: "56px",
          lineHeight: 1,
          letterSpacing: "0.02em",
          color: style.title,
        }}
      >
        {title}
      </Box>
      <Box
        component="span"
        sx={{ fontSize: "18px", color: style.text, lineHeight: 1.5 }}
      >
        {description}
      </Box>
    </Box>
  );
};

export const StartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        minHeight: "60px",
        padding: "0 40px",
        border: 0,
        borderRadius: "12px",
        cursor: "pointer",
        background: EB_GOLD,
        color: EB_BG,
        fontFamily: EB_LABEL_FONT,
        fontWeight: 700,
        fontSize: "24px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        "&:hover": { background: EB_GOLD_LIGHT },
        "&:focus-visible": {
          outline: "3px solid #FFFFFF",
          outlineOffset: "3px",
        },
      }}
    >
      Start battle
      <svg
        width="22"
        height="22"
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
};
