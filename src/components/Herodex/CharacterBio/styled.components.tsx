import { Box, Stack } from "@mui/material";
import {
  EB_BG,
  EB_BORDER,
  EB_HERO,
  EB_LABEL_FONT,
  EB_TEXT_SUBTLE,
  EB_VILLAIN,
} from "@/config/general";
import { FieldLabel } from "@/components/Herodex/CharacterSection/styled.components";
import SideIcon from "@/components/Herodex/SideIcon";

export const FieldList = ({ children }: { children: React.ReactNode }) => (
  <Stack>{children}</Stack>
);

export const Field = ({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Stack
    sx={{
      gap: "8px",
      padding: "16px 0",
      borderBottom: `1px solid ${EB_BORDER}`,
      "&:first-of-type": { paddingTop: 0 },
      "&:last-of-type": { borderBottom: 0, paddingBottom: 0 },
    }}
  >
    <FieldLabel>{label}</FieldLabel>
    {children}
  </Stack>
);

export const ValueText = ({ text }: { text: string }) => (
  <Box component="span" sx={{ fontSize: "20px", lineHeight: 1.35 }}>
    {text}
  </Box>
);

export const FullNameText = ({ text }: { text: string }) => (
  <Box
    component="span"
    sx={{
      fontFamily: EB_LABEL_FONT,
      fontWeight: 700,
      fontSize: "32px",
      lineHeight: 1.35,
      textTransform: "uppercase",
      letterSpacing: "0.02em",
    }}
  >
    {text}
  </Box>
);

export const AliasList = ({ aliases }: { aliases: string[] }) => (
  <Box
    component="ul"
    aria-label="Aliases"
    sx={{
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    }}
  >
    {aliases.map((alias) => (
      <Box
        component="li"
        key={alias}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          minHeight: "36px",
          boxSizing: "border-box",
          padding: "4px 14px",
          borderRadius: "999px",
          background: EB_BG,
          border: `2px solid ${EB_BORDER}`,
          fontSize: "16px",
        }}
      >
        {alias}
      </Box>
    ))}
  </Box>
);

export const Alignment = ({ isHero }: { isHero: boolean }) => (
  <Stack
    direction="row"
    sx={{ alignItems: "center", gap: "12px", flexWrap: "wrap" }}
  >
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        height: "40px",
        padding: "0 16px",
        borderRadius: "999px",
        background: isHero ? EB_HERO : EB_VILLAIN,
        color: EB_BG,
        fontFamily: EB_LABEL_FONT,
        fontWeight: 700,
        fontSize: "18px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      <SideIcon
        side={isHero ? "heroes" : "villains"}
        size={16}
        strokeWidth={2.2}
      />
      {isHero ? "Good" : "Bad"}
    </Box>
    <Box component="span" sx={{ fontSize: "15px", color: EB_TEXT_SUBTLE }}>
      Plays in the {isHero ? "hero" : "villain"} deck
    </Box>
  </Stack>
);

export const PinIcon = () => (
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
    <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const BookIcon = () => (
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
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z" />
    <path d="M4 21.5V4.5" />
  </svg>
);
