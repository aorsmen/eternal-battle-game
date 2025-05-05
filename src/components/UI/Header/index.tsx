import {
  Box,
  AppBar,
  Toolbar,
  Stack,
  Typography,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BG_COLOR, TITLE_STYLE, HEADER_HEIGHT } from "../../../config/general";

const Header = ({
  title,
  children,
  addon,
}: {
  title: string;
  children?: React.ReactNode;
  addon?: React.ReactNode;
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const windowSize = matches ? "lg" : "sm";
  return (
    <>
      <Box sx={{ height: `${HEADER_HEIGHT[windowSize]}px` }}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              minHeight: `${HEADER_HEIGHT[windowSize]}px`,
              paddingInline: matches ? "16px" : "8px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ width: "100%" }}
            >
              <Link
                component={RouterLink}
                to="/"
                sx={{ display: "flex", alignItems: "center" }}
                aria-label="Back"
              >
                <ArrowBackIcon
                  sx={{ color: BG_COLOR }}
                  fontSize={matches ? "medium" : "small"}
                />
              </Link>
              <Typography
                variant="h1"
                sx={{ fontSize: matches ? "24px" : "18px", ...TITLE_STYLE }}
              >
                {title}
              </Typography>
              {children}
            </Stack>
          </Toolbar>
        </AppBar>
        {addon}
      </Box>
    </>
  );
};

export default Header;
