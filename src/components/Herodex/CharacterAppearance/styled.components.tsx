import { Box, Stack } from "@mui/material";
import {
  EB_BORDER_STRONG,
  EB_DISPLAY_FONT,
  EB_LABEL_FONT,
  EB_TEXT_MUTED,
  EB_TEXT_SUBTLE,
} from "@/config/general";
import {
  FieldLabel,
  Tile,
} from "@/components/Herodex/CharacterSection/styled.components";

const TEXT_VALUE_STYLE = {
  fontFamily: EB_LABEL_FONT,
  fontWeight: 700,
  fontSize: "30px",
  lineHeight: 1.1,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
} as const;

// Shows "Unknown" in a muted colour when there is no text
export const TextValue = ({ text }: { text: string | null }) => (
  <Box
    component="span"
    sx={{ ...TEXT_VALUE_STYLE, color: text ? "inherit" : EB_TEXT_SUBTLE }}
  >
    {text ?? "Unknown"}
  </Box>
);

export const TextTile = ({
  label,
  text,
}: {
  label: string;
  text: string | null;
}) => (
  <Tile>
    <FieldLabel>{label}</FieldLabel>
    <TextValue text={text} />
  </Tile>
);

// `swatch` is a CSS background; null draws an empty dashed circle
export const ColorTile = ({
  label,
  text,
  swatch,
}: {
  label: string;
  text: string | null;
  swatch: string | null;
}) => (
  <Tile>
    <FieldLabel>{label}</FieldLabel>
    <Stack direction="row" sx={{ alignItems: "center", gap: "12px" }}>
      <Box
        component="span"
        aria-hidden="true"
        data-testid={`swatch-${label.toLowerCase().replace(/\s+/g, "-")}`}
        sx={{
          width: "34px",
          height: "34px",
          flex: "none",
          boxSizing: "border-box",
          borderRadius: "999px",
          ...(swatch
            ? {
                background: swatch,
                boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.18)",
              }
            : { border: `2px dashed ${EB_BORDER_STRONG}` }),
        }}
      />
      <TextValue text={text} />
    </Stack>
  </Tile>
);

export const MeasureTile = ({
  label,
  icon,
  value,
  unit,
  alt,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  value: string | null;
  unit?: string;
  alt?: string | null;
  children?: React.ReactNode;
}) => (
  <Tile
    component="section"
    sx={{
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "24px",
      flexWrap: "wrap",
    }}
  >
    <Stack sx={{ gap: "10px" }} aria-label={label}>
      <FieldLabel>
        {icon}
        {label}
      </FieldLabel>
      {value ? (
        <>
          <Box>
            <Box
              component="span"
              sx={{
                fontFamily: EB_DISPLAY_FONT,
                fontSize: "56px",
                lineHeight: 1,
                color: "#FFFFFF",
              }}
            >
              {value}
            </Box>
            <Box
              component="span"
              sx={{
                fontFamily: EB_LABEL_FONT,
                fontWeight: 700,
                fontSize: "22px",
                color: EB_TEXT_SUBTLE,
                marginLeft: "4px",
              }}
            >
              {unit}
            </Box>
          </Box>
          {alt && (
            <Box
              component="span"
              sx={{ fontSize: "16px", color: EB_TEXT_MUTED }}
            >
              {alt}
            </Box>
          )}
        </>
      ) : (
        <TextValue text={null} />
      )}
    </Stack>
    {children}
  </Tile>
);

export const PanelStack = ({ children }: { children: React.ReactNode }) => (
  <Stack sx={{ gap: "20px" }}>{children}</Stack>
);

// Head + body; drawn with boxes so the head stays round at any height
const Figure = ({ height, color }: { height: number; color: string }) => {
  const head = Math.min(26, Math.round(height * 0.17));

  return (
    <Stack aria-hidden="true" sx={{ alignItems: "center", gap: "4px" }}>
      <Box
        sx={{
          width: `${head}px`,
          height: `${head}px`,
          borderRadius: "999px",
          background: color,
        }}
      />
      <Box
        sx={{
          width: `${Math.max(Math.round(head * 1.3), 8)}px`,
          height: `${height - head - 4}px`,
          borderRadius: `${Math.round(head / 2)}px`,
          background: color,
        }}
      />
    </Stack>
  );
};

export const FigureWithCaption = ({
  height,
  color,
  caption,
  captionColor,
  bold = false,
}: {
  height: number;
  color: string;
  caption: string;
  captionColor: string;
  bold?: boolean;
}) => (
  <Stack sx={{ alignItems: "center", gap: "6px" }}>
    <Figure height={height} color={color} />
    <Box
      component="span"
      sx={{
        fontSize: "13px",
        fontWeight: bold ? 600 : 400,
        color: captionColor,
        maxWidth: "120px",
        textAlign: "center",
      }}
    >
      {caption}
    </Box>
  </Stack>
);

export const FigureRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Stack
    direction="row"
    role="img"
    aria-label={label}
    sx={{ alignItems: "flex-end", gap: "22px" }}
  >
    {children}
  </Stack>
);

export const HeightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v18" />
    <path d="M8 7l4-4 4 4" />
    <path d="M8 17l4 4 4-4" />
  </svg>
);

export const WeightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 8h12l2 13H4z" />
    <circle cx="12" cy="5" r="2.5" />
  </svg>
);
