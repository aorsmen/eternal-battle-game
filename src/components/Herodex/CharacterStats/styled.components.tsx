import { Box } from "@mui/material";
import { EB_BG, EB_DISPLAY_FONT } from "@/config/general";

export const StatBar = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <Box
    role="meter"
    aria-label={label}
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "110px minmax(0, 1fr) 40px",
        sm: "140px minmax(0, 1fr) 44px",
      },
      gap: "14px",
      alignItems: "center",
    }}
  >
    <Box component="span" sx={{ fontSize: "16px" }}>
      {label}
    </Box>
    <Box
      sx={{
        height: "12px",
        borderRadius: "999px",
        background: EB_BG,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${Math.min(Math.max(value, 0), 100)}%`,
          borderRadius: "999px",
          background: color,
        }}
      />
    </Box>
    <Box
      component="b"
      sx={{
        fontFamily: EB_DISPLAY_FONT,
        fontWeight: 400,
        fontSize: "22px",
        textAlign: "right",
      }}
    >
      {value}
    </Box>
  </Box>
);
