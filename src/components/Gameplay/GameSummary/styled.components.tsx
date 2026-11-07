import { Box, Stack } from "@mui/material";
import {
  EB_DISPLAY_FONT,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT_MUTED,
  EB_TEXT_SUBTLE,
} from "@/config/general";

export const FinalScore = ({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) => {
  return (
    <Stack sx={{ alignItems: "center", minWidth: 0 }}>
      <Box
        component="span"
        sx={{
          fontFamily: EB_DISPLAY_FONT,
          fontSize: { xs: "56px", sm: "72px" },
          lineHeight: 1,
          color,
        }}
      >
        {value}
      </Box>
      <Box
        component="span"
        sx={{
          fontSize: "15px",
          color: EB_TEXT_MUTED,
          maxWidth: "200px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Box>
    </Stack>
  );
};

export const StatTile = ({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) => {
  return (
    <Stack
      data-testid="stat-tile"
      sx={{
        alignItems: "center",
        gap: "4px",
        padding: "16px 12px",
        borderRadius: "14px",
        backgroundColor: EB_SURFACE,
        textAlign: "center",
      }}
    >
      <Box
        component="b"
        sx={{
          fontFamily: EB_DISPLAY_FONT,
          fontWeight: 400,
          fontSize: "40px",
          lineHeight: 1,
          color,
        }}
      >
        {value}
      </Box>
      <Box
        component="span"
        sx={{
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: "14px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: EB_TEXT_SUBTLE,
        }}
      >
        {label}
      </Box>
    </Stack>
  );
};
