import { useRef } from "react";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router";
import { HeroDataType } from "@/types/main.types";
import {
  EB_BG,
  EB_BORDER,
  EB_BORDER_STRONG,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_GOLD_LIGHT,
  EB_HERO,
  EB_HERO_ART_BG,
  EB_HERO_BORDER,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_MUTED,
  EB_TEXT_PLACEHOLDER,
  EB_TEXT_SUBTLE,
  EB_VILLAIN,
  EB_VILLAIN_ART_BG,
  EB_VILLAIN_BORDER,
  EB_VILLAIN_LIGHT,
} from "@/config/general";
import SideIcon from "@/components/Herodex/SideIcon";

const FOCUS_RING = {
  "&:focus-visible": { outline: `3px solid ${EB_GOLD}`, outlineOffset: "2px" },
};

const Chevron = ({ direction }: { direction: "left" | "right" }) => (
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
    <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
  </svg>
);

const NAV_BUTTON_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  boxSizing: "border-box",
  borderRadius: "12px",
  border: `2px solid ${EB_BORDER}`,
  color: EB_TEXT,
  "&:hover": { borderColor: EB_BORDER_STRONG, color: "#FFFFFF" },
  ...FOCUS_RING,
} as const;

export const DetailTopBar = ({
  position,
  total,
  prevId,
  nextId,
}: {
  position: number;
  total: number;
  prevId?: string;
  nextId?: string;
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <Box
        component={Link}
        to="/herodex"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          minHeight: "44px",
          color: EB_TEXT_MUTED,
          fontWeight: 600,
          textDecoration: "none",
          "&:hover": { color: "#FFFFFF" },
          ...FOCUS_RING,
        }}
      >
        <Chevron direction="left" />
        Herodex
      </Box>
      {total > 0 && (
        <Stack
          component="nav"
          aria-label="Browse characters"
          direction="row"
          sx={{ alignItems: "center", gap: "10px" }}
        >
          <Box
            component="span"
            sx={{ fontSize: "15px", color: EB_TEXT_SUBTLE }}
          >
            {position} of {total}
          </Box>
          {prevId && (
            <Box
              component={Link}
              to={`/herodex/${prevId}`}
              aria-label="Previous character"
              sx={NAV_BUTTON_STYLE}
            >
              <Chevron direction="left" />
            </Box>
          )}
          {nextId && (
            <Box
              component={Link}
              to={`/herodex/${nextId}`}
              aria-label="Next character"
              sx={NAV_BUTTON_STYLE}
            >
              <Chevron direction="right" />
            </Box>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export const Portrait = ({ hero }: { hero: HeroDataType }) => {
  const isHero = hero.biography.alignment === "good";

  return (
    <Box
      sx={{
        flex: "0 1 360px",
        minWidth: "260px",
        aspectRatio: "5 / 6",
        borderRadius: "20px",
        border: `3px solid ${isHero ? EB_HERO_BORDER : EB_VILLAIN_BORDER}`,
        background: isHero ? EB_HERO_ART_BG : EB_VILLAIN_ART_BG,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={hero.images.lg}
        alt={hero.name}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
    </Box>
  );
};

export const Intro = ({
  hero,
  subtitle,
}: {
  hero: HeroDataType;
  subtitle: string;
}) => {
  const isHero = hero.biography.alignment === "good";

  return (
    <Stack sx={{ gap: "10px" }}>
      <Box
        component="span"
        sx={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: isHero ? EB_HERO : EB_VILLAIN,
          color: EB_BG,
          borderRadius: "999px",
          padding: "6px 14px",
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: "15px",
          letterSpacing: "0.12em",
        }}
      >
        <SideIcon
          side={isHero ? "heroes" : "villains"}
          size={16}
          strokeWidth={2.2}
        />
        {isHero ? "HERO" : "VILLAIN"}
      </Box>
      <Box
        component="h1"
        sx={{
          margin: 0,
          fontFamily: EB_DISPLAY_FONT,
          fontWeight: 400,
          fontSize: "clamp(52px, 8vw, 96px)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          color: isHero ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT,
          overflowWrap: "anywhere",
        }}
      >
        {hero.name}
      </Box>
      <Box
        component="p"
        sx={{ margin: 0, fontSize: "20px", color: EB_TEXT_MUTED }}
      >
        {subtitle}
      </Box>
    </Stack>
  );
};

export const AttackIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" />
  </svg>
);

export const DefenseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const ValueTile = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Stack
    sx={{
      gap: "6px",
      padding: "16px 20px",
      borderRadius: "14px",
      background: EB_SURFACE,
      minWidth: "150px",
      flex: { xs: "1 1 130px", sm: "0 0 auto" },
    }}
  >
    <Box
      component="span"
      sx={{
        fontFamily: EB_LABEL_FONT,
        fontWeight: 700,
        fontSize: "15px",
        letterSpacing: "0.14em",
        color: EB_TEXT_SUBTLE,
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {icon}
      {label}
    </Box>
    <Box
      component="b"
      data-testid={`value-${label.toLowerCase()}`}
      sx={{
        fontFamily: EB_DISPLAY_FONT,
        fontWeight: 400,
        fontSize: "64px",
        lineHeight: 1,
        color: "#FFFFFF",
      }}
    >
      {value}
    </Box>
  </Stack>
);

// A battle is won when attack >= the opponent's defence and defence > the
// opponent's attack
export const BattleRule = ({
  attack,
  defense,
}: {
  attack: number;
  defense: number;
}) => (
  <Stack
    sx={{
      flex: "1 1 240px",
      justifyContent: "center",
      gap: "6px",
      padding: "16px 20px",
      borderRadius: "14px",
      border: `2px solid ${EB_GOLD}`,
    }}
  >
    <Box
      component="span"
      sx={{
        fontFamily: EB_LABEL_FONT,
        fontWeight: 700,
        fontSize: "15px",
        letterSpacing: "0.14em",
        color: EB_GOLD,
      }}
    >
      IN BATTLE
    </Box>
    <Box component="span" sx={{ fontSize: "17px", lineHeight: 1.45 }}>
      {defense > 0 ? (
        <>
          Beats any card with <b>defence of {attack} or less</b> and{" "}
          <b>attack below {defense}</b>.
        </>
      ) : (
        <>
          Can't win a battle: with <b>0 defence</b>, every attack gets through.
        </>
      )}
    </Box>
  </Stack>
);

const ACTION_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  minHeight: "52px",
  boxSizing: "border-box",
  borderRadius: "12px",
  fontFamily: EB_LABEL_FONT,
  fontWeight: 700,
  fontSize: "20px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
} as const;

export const CompareActions = ({
  name,
  inCompare,
  compareFull,
  onToggle,
}: {
  name: string;
  inCompare: boolean;
  compareFull: boolean;
  onToggle: () => void;
}) => {
  const disabled = !inCompare && compareFull;
  const label = inCompare
    ? "In compare"
    : disabled
      ? "Compare full"
      : "Add to compare";

  return (
    <Stack direction="row" sx={{ gap: "12px", flexWrap: "wrap" }}>
      <Box
        component="button"
        type="button"
        aria-pressed={inCompare}
        aria-label={`${label}: ${name}`}
        disabled={disabled}
        onClick={onToggle}
        sx={{
          ...ACTION_STYLE,
          appearance: "none",
          cursor: "pointer",
          border: 0,
          padding: "0 26px",
          background: inCompare ? "transparent" : EB_GOLD,
          color: inCompare ? EB_GOLD : EB_BG,
          boxShadow: inCompare ? `inset 0 0 0 2px ${EB_GOLD}` : "none",
          "&:hover:not(:disabled)": {
            background: inCompare ? "transparent" : EB_GOLD_LIGHT,
            color: inCompare ? EB_GOLD_LIGHT : EB_BG,
          },
          "&:disabled": {
            background: EB_BORDER,
            color: EB_TEXT_PLACEHOLDER,
            cursor: "not-allowed",
          },
          "&:focus-visible": {
            outline: "3px solid #FFFFFF",
            outlineOffset: "3px",
          },
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={inCompare ? "M5 12l5 5 9-10" : "M12 5v14M5 12h14"} />
        </svg>
        {label}
      </Box>
    </Stack>
  );
};

export type DetailTabType = "stats" | "bio" | "look";

const TABS: { value: DetailTabType; label: string }[] = [
  { value: "stats", label: "Stats & skills" },
  { value: "bio", label: "Biography" },
  { value: "look", label: "Appearance" },
];

export const DetailTabs = ({
  value,
  onChange,
}: {
  value: DetailTabType;
  onChange: (value: DetailTabType) => void;
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs, as in the WAI-ARIA tabs pattern
  const keyDownHandler = (event: React.KeyboardEvent, index: number) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;

    event.preventDefault();
    const next = (index + step + TABS.length) % TABS.length;
    onChange(TABS[next].value);
    tabRefs.current[next]?.focus();
  };

  return (
    <Box
      role="tablist"
      aria-label="Character details"
      sx={{
        display: "flex",
        gap: "4px",
        borderBottom: `2px solid ${EB_BORDER}`,
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {TABS.map((tab, index) => {
        const active = tab.value === value;

        return (
          <Box
            key={tab.value}
            component="button"
            type="button"
            role="tab"
            id={`character-tab-${tab.value}`}
            aria-selected={active}
            aria-controls={`character-panel-${tab.value}`}
            tabIndex={active ? 0 : -1}
            ref={(element: HTMLButtonElement | null) => {
              tabRefs.current[index] = element;
            }}
            onClick={() => onChange(tab.value)}
            onKeyDown={(event: React.KeyboardEvent) =>
              keyDownHandler(event, index)
            }
            sx={{
              appearance: "none",
              border: 0,
              borderBottom: `3px solid ${active ? EB_GOLD : "transparent"}`,
              marginBottom: "-2px",
              background: "transparent",
              cursor: "pointer",
              minHeight: "52px",
              padding: "0 20px",
              color: active ? EB_GOLD : EB_TEXT_SUBTLE,
              fontFamily: EB_LABEL_FONT,
              fontWeight: 700,
              fontSize: "19px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              "&:hover": { color: active ? EB_GOLD : "#FFFFFF" },
              "&:focus-visible": {
                outline: `3px solid ${EB_GOLD}`,
                outlineOffset: "-3px",
              },
            }}
          >
            {tab.label}
          </Box>
        );
      })}
    </Box>
  );
};

export const NotFound = () => (
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
      component="h1"
      sx={{
        margin: 0,
        fontFamily: EB_DISPLAY_FONT,
        fontWeight: 400,
        fontSize: "28px",
      }}
    >
      Character not found
    </Box>
    <Box component="span" sx={{ color: EB_TEXT_SUBTLE }}>
      This character isn't in the Herodex.{" "}
      <Box
        component={Link}
        to="/herodex"
        sx={{ color: EB_GOLD, "&:hover": { color: EB_GOLD_LIGHT } }}
      >
        Back to all characters
      </Box>
    </Box>
  </Stack>
);

export const PageMain = ({ children }: { children: React.ReactNode }) => (
  <Box component="main" sx={{ flex: 1, padding: "28px 24px 56px" }}>
    <Stack sx={{ maxWidth: "1240px", marginInline: "auto", gap: "32px" }}>
      {children}
    </Stack>
  </Box>
);

export const SummarySection = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="section"
    aria-label="Character summary"
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "40px",
      alignItems: "stretch",
    }}
  >
    {children}
  </Box>
);

export const SummaryDetails = ({ children }: { children: React.ReactNode }) => (
  <Stack
    sx={{
      flex: "999 1 480px",
      minWidth: 0,
      gap: "22px",
      justifyContent: "center",
    }}
  >
    {children}
  </Stack>
);

export const ValueRow = ({ children }: { children: React.ReactNode }) => (
  <Stack direction="row" sx={{ gap: "14px", flexWrap: "wrap" }}>
    {children}
  </Stack>
);

export const TabPanel = ({
  tab,
  children,
}: {
  tab: DetailTabType;
  children: React.ReactNode;
}) => (
  <Box
    role="tabpanel"
    id={`character-panel-${tab}`}
    aria-labelledby={`character-tab-${tab}`}
  >
    {children}
  </Box>
);
