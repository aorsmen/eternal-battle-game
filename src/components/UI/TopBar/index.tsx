import { Box, Stack } from "@mui/material";
import { Link } from "react-router";
import {
  EB_DISPLAY_FONT,
  EB_HERO_LIGHT,
  EB_TEXT_MUTED,
  EB_VILLAIN_LIGHT,
} from "@/config/general";

const TopBar = () => {
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
        to="/"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          minHeight: "44px",
          color: EB_TEXT_MUTED,
          fontWeight: 600,
          textDecoration: "none",
          "&:hover": { color: "#FFFFFF" },
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Home
      </Box>
      <Box
        component="span"
        sx={{
          fontFamily: EB_DISPLAY_FONT,
          fontSize: "22px",
          letterSpacing: "0.04em",
        }}
      >
        <Box component="span" sx={{ color: EB_HERO_LIGHT }}>
          ETERNAL
        </Box>{" "}
        <Box component="span" sx={{ color: EB_VILLAIN_LIGHT }}>
          BATTLE
        </Box>
      </Box>
    </Stack>
  );
};

export default TopBar;
