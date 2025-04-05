import { Box, AppBar, Toolbar, Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BG_COLOR, TITLE_STYLE } from "../../../config/general";

const GameHeader = () => {
  return (
    <Box sx={{ height: "64px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Link
              component={RouterLink}
              to="/"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ArrowBackIcon sx={{ color: BG_COLOR }} />
            </Link>
            <Typography variant="h1" sx={{ fontSize: "24px", ...TITLE_STYLE }}>
              BATTLE
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default GameHeader;
