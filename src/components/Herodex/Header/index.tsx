import { Box, AppBar, Toolbar, Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NodeIndex from "../NodeIndex";
import { BG_COLOR, TITLE_STYLE } from "../../../config/general";

const Header = () => {
  return (
    <Box>
      <AppBar position="static">
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
              HERODEX
            </Typography>
            <NodeIndex />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
