import { Box } from "@mui/material";
import { Link } from "react-router";
import { HerodexSideType } from "@/types/main.types";
import SideIcon from "@/components/Herodex/SideIcon";
import {
  EB_BG,
  EB_BODY_FONT,
  EB_BORDER,
  EB_CARD_FACE,
  EB_GOLD,
  EB_HERO_ART_BG,
  EB_HERO_BORDER,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_TEXT,
  EB_TEXT_MUTED,
  EB_TEXT_SUBTLE,
  EB_VILLAIN_ART_BG,
  EB_VILLAIN_BORDER,
  EB_VILLAIN_LIGHT,
} from "@/config/general";

const SIDE_STYLES = {
  heroes: { border: EB_HERO_BORDER, art: EB_HERO_ART_BG, icon: EB_HERO_LIGHT },
  villains: {
    border: EB_VILLAIN_BORDER,
    art: EB_VILLAIN_ART_BG,
    icon: EB_VILLAIN_LIGHT,
  },
};

const ELLIPSIS = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

export const CardWrapper = ({
  side,
  selected,
  children,
}: {
  side: HerodexSideType;
  selected: boolean;
  children: React.ReactNode;
}) => (
  <Box
    component="article"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "10px",
      borderRadius: "14px",
      background: EB_CARD_FACE,
      border: `2px solid ${SIDE_STYLES[side].border}`,
      boxShadow: selected ? `0 0 0 3px ${EB_GOLD}` : "none",
      minWidth: 0,
    }}
  >
    {children}
  </Box>
);

export const CardLink = ({
  to,
  label,
  children,
}: {
  to: string;
  label: string;
  children: React.ReactNode;
}) => (
  <Box
    component={Link}
    to={to}
    aria-label={label}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      textDecoration: "none",
      color: EB_TEXT,
      borderRadius: "9px",
      "&:hover .roster-card-name": { color: EB_GOLD },
      "&:focus-visible": {
        outline: `3px solid ${EB_GOLD}`,
        outlineOffset: "3px",
      },
    }}
  >
    {children}
  </Box>
);

export const CardName = ({ name }: { name: string }) => (
  <Box
    component="span"
    className="roster-card-name"
    sx={{
      fontFamily: EB_LABEL_FONT,
      fontWeight: 700,
      fontSize: "19px",
      textTransform: "uppercase",
      letterSpacing: "0.03em",
      lineHeight: 1.1,
      ...ELLIPSIS,
    }}
  >
    {name}
  </Box>
);

export const CardArt = ({
  side,
  src,
}: {
  side: HerodexSideType;
  src: string;
}) => (
  <Box
    sx={{
      height: "150px",
      borderRadius: "9px",
      overflow: "hidden",
      position: "relative",
      background: SIDE_STYLES[side].art,
    }}
  >
    <Box
      component="img"
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      sx={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "top",
      }}
    />
    <Box
      component="span"
      data-testid={`roster-card-badge-${side}`}
      sx={{
        position: "absolute",
        top: "8px",
        right: "8px",
        width: "30px",
        height: "30px",
        borderRadius: "999px",
        background: EB_BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SideIcon side={side} color={SIDE_STYLES[side].icon} />
    </Box>
  </Box>
);

export const CardRole = ({ text }: { text: string }) => (
  <Box
    component="span"
    title={text}
    sx={{
      fontFamily: EB_BODY_FONT,
      fontSize: "13px",
      color: EB_TEXT_SUBTLE,
      ...ELLIPSIS,
    }}
  >
    {text}
  </Box>
);

export const CompareButton = ({
  label,
  name,
  selected,
  disabled,
  onClick,
}: {
  label: string;
  name: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) => (
  <Box
    component="button"
    type="button"
    aria-pressed={selected}
    aria-label={`${label}: ${name}`}
    disabled={disabled}
    onClick={onClick}
    sx={{
      appearance: "none",
      cursor: "pointer",
      minHeight: "40px",
      borderRadius: "9px",
      border: `2px solid ${selected ? EB_GOLD : EB_BORDER}`,
      background: selected ? EB_GOLD : "transparent",
      color: selected ? EB_BG : EB_TEXT_MUTED,
      fontFamily: EB_LABEL_FONT,
      fontWeight: 700,
      fontSize: "15px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      "&:hover:not(:disabled)": {
        borderColor: EB_GOLD,
        color: selected ? EB_BG : "#FFFFFF",
      },
      "&:disabled": { opacity: 0.45, cursor: "not-allowed" },
      "&:focus-visible": {
        outline: `3px solid ${EB_GOLD}`,
        outlineOffset: "2px",
      },
    }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={selected ? "M5 12l5 5 9-10" : "M12 5v14M5 12h14"} />
    </svg>
    {label}
  </Box>
);
