import { Box, Stack } from "@mui/material";
import { Link } from "react-router";
import { RosterHeroType } from "@/types/main.types";
import { COMPARE_LIMIT } from "@/config/hero";
import {
  EB_BG,
  EB_BORDER,
  EB_BORDER_STRONG,
  EB_CARD_FACE,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_GOLD_LIGHT,
  EB_HERO_ART_BG,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_SLOT_BORDER,
  EB_TEXT,
  EB_TEXT_PLACEHOLDER,
  EB_TEXT_SUBTLE,
  EB_TRAY_BG,
  EB_VILLAIN_ART_BG,
  EB_VILLAIN_LIGHT,
} from "@/config/general";

const SLOT_HEIGHT = "68px";

const ACTION_BUTTON_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  minHeight: "52px",
  boxSizing: "border-box",
  borderRadius: "12px",
  fontFamily: EB_LABEL_FONT,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
} as const;

export const TrayWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="section"
    aria-label="Compare tray"
    sx={{
      position: "sticky",
      bottom: 0,
      zIndex: 5,
      background: EB_TRAY_BG,
      borderTop: `3px solid ${EB_GOLD}`,
      boxShadow: "0 -16px 40px rgba(0, 0, 0, 0.55)",
    }}
  >
    <Box
      sx={{
        maxWidth: "1240px",
        marginInline: "auto",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      {children}
    </Box>
  </Box>
);

export const TrayTitle = ({ count }: { count: number }) => (
  <Stack>
    <Box
      component="span"
      sx={{
        fontFamily: EB_LABEL_FONT,
        fontWeight: 700,
        fontSize: "18px",
        letterSpacing: "0.12em",
        color: EB_GOLD,
      }}
    >
      COMPARE
    </Box>
    <Box component="span" sx={{ fontSize: "14px", color: EB_TEXT_SUBTLE }}>
      {count} of {COMPARE_LIMIT} picked
    </Box>
  </Stack>
);

export const SlotList = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="ul"
    aria-label="Characters picked for compare"
    sx={{
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, minmax(0, 1fr))",
        md: `repeat(${COMPARE_LIMIT}, minmax(0, 1fr))`,
      },
      gap: "10px",
      flex: "1 1 640px",
      minWidth: 0,
    }}
  >
    {children}
  </Box>
);

export const PickedItem = ({
  hero,
  color,
  onRemove,
}: {
  hero: RosterHeroType;
  color: string;
  onRemove: () => void;
}) => {
  const isHero = hero.side === "heroes";

  return (
    <Box
      component="li"
      sx={{
        display: "grid",
        gridTemplateColumns: "52px minmax(0, 1fr) 36px",
        gap: "10px",
        alignItems: "center",
        height: SLOT_HEIGHT,
        boxSizing: "border-box",
        padding: "8px 6px 8px 8px",
        borderRadius: "12px",
        background: EB_CARD_FACE,
        border: `2px solid ${EB_BORDER}`,
        borderTop: `4px solid ${color}`,
        minWidth: 0,
      }}
    >
      <Box
        component="img"
        src={hero.images.xs}
        alt=""
        sx={{
          width: "52px",
          height: "48px",
          borderRadius: "8px",
          objectFit: "cover",
          objectPosition: "top",
          background: isHero ? EB_HERO_ART_BG : EB_VILLAIN_ART_BG,
        }}
      />
      <Stack sx={{ gap: "2px", minWidth: 0 }}>
        <Box
          component="span"
          sx={{
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: "17px",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: isHero ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT,
          }}
        >
          {hero.name}
        </Box>
        <Box
          component="span"
          sx={{
            fontSize: "13px",
            color: EB_TEXT_SUBTLE,
            whiteSpace: "nowrap",
            "& b": {
              fontFamily: EB_DISPLAY_FONT,
              fontWeight: 400,
              fontSize: "15px",
              color: "#FFFFFF",
            },
          }}
        >
          ATK <b>{hero.values.attack}</b>&nbsp; DEF <b>{hero.values.defense}</b>
        </Box>
      </Stack>
      <Box
        component="button"
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${hero.name} from compare`}
        sx={{
          appearance: "none",
          border: 0,
          background: "transparent",
          color: EB_TEXT_SUBTLE,
          cursor: "pointer",
          width: "36px",
          height: "36px",
          borderRadius: "999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": { background: EB_BORDER, color: "#FFFFFF" },
          "&:focus-visible": { outline: `3px solid ${EB_GOLD}` },
        }}
      >
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
      </Box>
    </Box>
  );
};

export const EmptySlot = () => (
  <Box
    component="li"
    sx={{
      height: SLOT_HEIGHT,
      borderRadius: "12px",
      border: `2px dashed ${EB_SLOT_BORDER}`,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      color: EB_TEXT_PLACEHOLDER,
      fontSize: "14px",
    }}
  >
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
      <path d="M12 5v14M5 12h14" />
    </svg>
    Empty slot
  </Box>
);

export const TrayActions = ({ children }: { children: React.ReactNode }) => (
  <Stack direction="row" sx={{ gap: "10px" }}>
    {children}
  </Stack>
);

export const ClearButton = ({ onClick }: { onClick: () => void }) => (
  <Box
    component="button"
    type="button"
    onClick={onClick}
    sx={{
      ...ACTION_BUTTON_STYLE,
      appearance: "none",
      cursor: "pointer",
      padding: "0 20px",
      border: `2px solid ${EB_BORDER}`,
      background: "transparent",
      color: EB_TEXT,
      fontSize: "18px",
      "&:hover": { borderColor: EB_BORDER_STRONG },
      "&:focus-visible": { outline: `3px solid ${EB_GOLD}` },
    }}
  >
    Clear
  </Box>
);

// A link once two characters are picked, otherwise a disabled placeholder
export const CompareLink = ({ to }: { to: string | null }) => {
  if (!to) {
    return (
      <Box
        component="span"
        aria-disabled="true"
        title="Pick at least two characters"
        sx={{
          ...ACTION_BUTTON_STYLE,
          padding: "0 28px",
          background: EB_BORDER,
          color: EB_TEXT_PLACEHOLDER,
          fontSize: "20px",
        }}
      >
        Compare
      </Box>
    );
  }

  return (
    <Box
      component={Link}
      to={to}
      sx={{
        ...ACTION_BUTTON_STYLE,
        padding: "0 28px",
        background: EB_GOLD,
        color: EB_BG,
        fontSize: "20px",
        "&:hover": { background: EB_GOLD_LIGHT },
        "&:focus-visible": {
          outline: "3px solid #FFFFFF",
          outlineOffset: "3px",
        },
      }}
    >
      Compare
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
};
