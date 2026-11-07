import { Box, Stack } from "@mui/material";
import { Link } from "react-router";
import { CompareTabType, HeroDataType } from "@/types/main.types";
import { COMPARE_LIMIT } from "@/config/hero";
import {
  EB_BG,
  EB_BODY_FONT,
  EB_BORDER,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_SLOT_BORDER,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_MUTED,
  EB_TEXT_SUBTLE,
  EB_VILLAIN_LIGHT,
} from "@/config/general";

const FOCUS_RING = {
  "&:focus-visible": {
    outline: `3px solid ${EB_GOLD}`,
    outlineOffset: "2px",
  },
} as const;

const LABEL_TEXT = {
  fontFamily: EB_LABEL_FONT,
  fontWeight: 700,
  textTransform: "uppercase",
} as const;

export const PageMain = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="main"
    sx={{
      flex: 1,
      padding: "28px 24px 56px",
      color: EB_TEXT,
      fontFamily: EB_BODY_FONT,
    }}
  >
    <Stack sx={{ maxWidth: "1240px", marginInline: "auto", gap: "28px" }}>
      {children}
    </Stack>
  </Box>
);

export const PageHeader = () => (
  <Stack component="header" sx={{ gap: "8px" }}>
    <Box
      component="h1"
      sx={{
        margin: 0,
        fontFamily: EB_DISPLAY_FONT,
        fontWeight: 400,
        fontSize: "clamp(44px, 6vw, 72px)",
        lineHeight: 0.95,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      Compare
    </Box>
    <Box
      component="p"
      sx={{ margin: 0, fontSize: "18px", color: EB_TEXT_MUTED }}
    >
      Hide a character to take it off the chart, or remove it to free a slot.
    </Box>
  </Stack>
);

export const PeopleGrid = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="section"
    aria-label="Characters in this comparison"
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
      gap: "14px",
    }}
  >
    {children}
  </Box>
);

const ICON_BUTTON_STYLE = {
  appearance: "none",
  border: 0,
  background: "transparent",
  color: EB_TEXT_SUBTLE,
  cursor: "pointer",
  width: "40px",
  height: "40px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "none",
  "&:hover": { background: EB_BORDER, color: "#FFFFFF" },
  ...FOCUS_RING,
} as const;

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {open ? (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M3 3l18 18" />
        <path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.8 9.8 0 0 0 5.4-1.6" />
      </>
    )}
  </svg>
);

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const PersonCard = ({
  hero,
  color,
  shown,
  onToggleShown,
  onRemove,
}: {
  hero: HeroDataType;
  color: string;
  shown: boolean;
  onToggleShown: () => void;
  onRemove: () => void;
}) => {
  const isHero = hero.biography.alignment === "good";

  return (
    <Stack
      component="article"
      aria-label={hero.name}
      sx={{
        gap: "10px",
        padding: "16px 18px",
        borderRadius: "14px",
        background: EB_SURFACE,
        border: `2px solid ${color}`,
        minWidth: 0,
        opacity: shown ? 1 : 0.5,
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", gap: "10px", minWidth: 0 }}
      >
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            width: "14px",
            height: "14px",
            borderRadius: "999px",
            flex: "none",
            background: color,
          }}
        />
        <Box
          component={Link}
          to={`/herodex/${hero.id}`}
          sx={{
            ...LABEL_TEXT,
            fontSize: "22px",
            letterSpacing: "0.03em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
            minWidth: 0,
            color: EB_TEXT,
            textDecoration: "none",
            "&:hover": { color: "#FFFFFF", textDecoration: "underline" },
            ...FOCUS_RING,
          }}
        >
          {hero.name}
        </Box>
        <Box
          component="button"
          type="button"
          aria-pressed={shown}
          aria-label={`${shown ? "Hide" : "Show"} ${hero.name} on chart`}
          onClick={onToggleShown}
          sx={ICON_BUTTON_STYLE}
        >
          <EyeIcon open={shown} />
        </Box>
        <Box
          component="button"
          type="button"
          aria-label={`Remove ${hero.name}`}
          onClick={onRemove}
          sx={ICON_BUTTON_STYLE}
        >
          <CloseIcon />
        </Box>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          fontSize: "14px",
          color: EB_TEXT_SUBTLE,
          "& b": {
            fontFamily: EB_DISPLAY_FONT,
            fontWeight: 400,
            fontSize: "20px",
            color: "#FFFFFF",
          },
        }}
      >
        <Box
          component="span"
          sx={{
            ...LABEL_TEXT,
            letterSpacing: "0.1em",
            color: isHero ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT,
          }}
        >
          {isHero ? "Hero" : "Villain"}
        </Box>
        <span>
          ATK <b>{hero.values.attack}</b>&nbsp; DEF <b>{hero.values.defense}</b>
        </span>
      </Stack>
    </Stack>
  );
};

export const AddSlot = ({
  slotsLeft,
  onClick,
}: {
  slotsLeft: number;
  onClick: () => void;
}) => (
  <Box
    component="button"
    type="button"
    aria-haspopup="dialog"
    onClick={onClick}
    sx={{
      ...LABEL_TEXT,
      appearance: "none",
      cursor: "pointer",
      background: "transparent",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      minHeight: "110px",
      borderRadius: "14px",
      border: `2px dashed ${EB_SLOT_BORDER}`,
      color: EB_TEXT_MUTED,
      fontSize: "18px",
      letterSpacing: "0.08em",
      "&:hover": { borderColor: EB_GOLD, color: EB_GOLD },
      ...FOCUS_RING,
    }}
  >
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
    Add character
    <Box
      component="span"
      sx={{
        fontFamily: EB_BODY_FONT,
        fontWeight: 500,
        fontSize: "14px",
        letterSpacing: 0,
        textTransform: "none",
        color: EB_TEXT_SUBTLE,
      }}
    >
      {slotsLeft} of {COMPARE_LIMIT} slots free
    </Box>
  </Box>
);

export const PanelRow = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="section"
    aria-label="Stats and skills"
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "24px",
      alignItems: "stretch",
    }}
  >
    {children}
  </Box>
);

const PanelTitle = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="h2"
    sx={{
      ...LABEL_TEXT,
      margin: 0,
      fontSize: "18px",
      letterSpacing: "0.16em",
      color: EB_TEXT_SUBTLE,
    }}
  >
    {children}
  </Box>
);

// `label` turns the panel into a named region; `intro` sits under the title
export const Panel = ({
  title,
  label,
  intro,
  actions,
  grow,
  children,
}: {
  title: string;
  label?: string;
  intro?: string;
  actions?: React.ReactNode;
  grow?: string;
  children: React.ReactNode;
}) => (
  <Stack
    component={label ? "section" : "div"}
    aria-label={label}
    sx={{
      background: EB_SURFACE,
      borderRadius: "16px",
      padding: { xs: "18px 16px", sm: "22px 24px" },
      gap: "16px",
      minWidth: 0,
      flex: grow,
    }}
  >
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <Stack sx={{ gap: "6px" }}>
        <PanelTitle>{title}</PanelTitle>
        {intro && (
          <Box
            component="p"
            sx={{ margin: 0, fontSize: "16px", color: EB_TEXT_MUTED }}
          >
            {intro}
          </Box>
        )}
      </Stack>
      {actions}
    </Stack>
    {children}
  </Stack>
);

const TAB_OPTIONS: { value: CompareTabType; label: string }[] = [
  { value: "stats", label: "Stats" },
  { value: "skills", label: "Skills" },
];

export const ChartToggle = ({
  value,
  onChange,
}: {
  value: CompareTabType;
  onChange: (value: CompareTabType) => void;
}) => (
  <Box
    role="radiogroup"
    aria-label="Chart data"
    sx={{
      display: "flex",
      gap: "4px",
      padding: "4px",
      borderRadius: "12px",
      background: EB_BG,
    }}
  >
    {TAB_OPTIONS.map((option) => {
      const active = option.value === value;
      return (
        <Box
          key={option.value}
          component="button"
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(option.value)}
          sx={{
            ...LABEL_TEXT,
            appearance: "none",
            border: 0,
            cursor: "pointer",
            minHeight: "40px",
            padding: "0 18px",
            borderRadius: "8px",
            background: active ? EB_GOLD : "transparent",
            color: active ? EB_BG : EB_TEXT_MUTED,
            fontSize: "17px",
            letterSpacing: "0.06em",
            "&:hover": { color: active ? EB_BG : "#FFFFFF" },
            ...FOCUS_RING,
          }}
        >
          {option.label}
        </Box>
      );
    })}
  </Box>
);

export const PanelNote = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="p"
    sx={{ margin: 0, fontSize: "14px", color: EB_TEXT_SUBTLE }}
  >
    {children}
  </Box>
);

export const NoPicks = () => (
  <Stack
    sx={{
      padding: "48px 24px",
      borderRadius: "14px",
      border: `2px dashed ${EB_BORDER}`,
      textAlign: "center",
      gap: "8px",
      alignItems: "center",
    }}
  >
    <Box
      component="span"
      sx={{ fontFamily: EB_DISPLAY_FONT, fontSize: "28px" }}
    >
      Nothing to compare yet
    </Box>
    <Box component="span" sx={{ color: EB_TEXT_SUBTLE }}>
      Add up to {COMPARE_LIMIT} characters, or pick them from the{" "}
      <Box component={Link} to="/herodex" sx={{ color: EB_GOLD }}>
        Herodex
      </Box>
      .
    </Box>
  </Stack>
);
