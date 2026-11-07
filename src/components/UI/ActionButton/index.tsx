import { Box, ButtonBase } from "@mui/material";
import { Link } from "react-router";
import {
  EB_BG,
  EB_BORDER,
  EB_BORDER_STRONG,
  EB_GOLD,
  EB_GOLD_LIGHT,
  EB_LABEL_FONT,
  EB_TEXT,
} from "@/config/general";

const BASE_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  minHeight: "56px",
  borderRadius: "12px",
  boxSizing: "border-box",
  textDecoration: "none",
  fontFamily: EB_LABEL_FONT,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  "&:focus-visible": {
    outline: `3px solid ${EB_TEXT}`,
    outlineOffset: "3px",
  },
};

const VARIANT_STYLE = {
  primary: {
    padding: "0 32px",
    backgroundColor: EB_GOLD,
    color: EB_BG,
    fontSize: "22px",
    "&:hover": { backgroundColor: EB_GOLD_LIGHT, color: EB_BG },
  },
  ghost: {
    padding: "0 24px",
    border: `2px solid ${EB_BORDER}`,
    color: EB_TEXT,
    fontSize: "20px",
    "&:hover": { borderColor: EB_BORDER_STRONG, color: "#FFFFFF" },
  },
};

// Gold call-to-action or outlined secondary action from the redesign.
// Renders a router link when `to` is given, otherwise a button.
const ActionButton = ({
  variant = "primary",
  to,
  onClick,
  icon,
  children,
}: {
  variant?: "primary" | "ghost";
  to?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const sx = { ...BASE_STYLE, ...VARIANT_STYLE[variant] };

  if (to) {
    return (
      <Box component={Link} to={to} onClick={onClick} sx={sx}>
        {children}
        {icon}
      </Box>
    );
  }

  return (
    <ButtonBase onClick={onClick} sx={sx}>
      {children}
      {icon}
    </ButtonBase>
  );
};

export const ArrowIcon = () => (
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
);

export const PlusIcon = () => (
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
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const RematchIcon = () => (
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
    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export default ActionButton;
