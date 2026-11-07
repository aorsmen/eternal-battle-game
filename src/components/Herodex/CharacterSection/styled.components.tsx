import { Box, Stack } from "@mui/material";
import {
  EB_LABEL_FONT,
  EB_SLOT_BORDER,
  EB_SURFACE,
  EB_TEXT_SUBTLE,
} from "@/config/general";

// Building blocks shared by the character detail tabs

const LABEL_STYLE = {
  fontFamily: EB_LABEL_FONT,
  fontWeight: 700,
  fontSize: "14px",
  letterSpacing: "0.14em",
  color: EB_TEXT_SUBTLE,
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  gap: "8px",
} as const;

export const SectionWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Stack
    component="section"
    aria-label={title}
    sx={{
      background: EB_SURFACE,
      borderRadius: "16px",
      padding: "22px 24px",
      gap: "16px",
      minWidth: 0,
    }}
  >
    {children}
  </Stack>
);

export const SectionTitle = ({ title }: { title: string }) => (
  <Box
    component="h2"
    sx={{
      ...LABEL_STYLE,
      margin: 0,
      fontSize: "18px",
      letterSpacing: "0.16em",
    }}
  >
    {title}
  </Box>
);

// Responsive grid for the tab panels: one column on phones
export const PanelGrid = ({
  minWidth,
  gap,
  children,
}: {
  minWidth: number;
  gap: number;
  children: React.ReactNode;
}) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(min(${minWidth}px, 100%), 1fr))`,
      gap: `${gap}px`,
    }}
  >
    {children}
  </Box>
);

export const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Box component="span" sx={LABEL_STYLE}>
    {children}
  </Box>
);

export const EmptyChip = ({ text }: { text: string }) => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      alignSelf: "flex-start",
      height: "36px",
      boxSizing: "border-box",
      padding: "0 14px",
      borderRadius: "999px",
      border: `2px dashed ${EB_SLOT_BORDER}`,
      color: EB_TEXT_SUBTLE,
      fontSize: "15px",
      fontStyle: "italic",
    }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 16.5l9-9" />
    </svg>
    {text}
  </Box>
);

export const Tile = ({
  children,
  component = "div",
  sx = {},
}: {
  children: React.ReactNode;
  component?: React.ElementType;
  sx?: object;
}) => (
  <Stack
    component={component}
    sx={{
      background: EB_SURFACE,
      borderRadius: "16px",
      padding: "20px 22px",
      gap: "12px",
      minWidth: 0,
      ...sx,
    }}
  >
    {children}
  </Stack>
);
