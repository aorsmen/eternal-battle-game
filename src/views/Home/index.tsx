import { Stack, Link } from "@mui/material";
import { Link as routerLink } from "react-router";
import logo from "../../assets/logo.png";
import { LogoWrapper, MenuItem } from "./styled.components";
import { BG_COLOR, TITLE_STYLE } from "../../config/general";

const Home = () => {
  return (
    <Stack
      alignItems="center"
      sx={{ height: "100dvh", width: "100%", backgroundColor: BG_COLOR }}
    >
      <LogoWrapper src={logo} />
      <MenuItem>
        <Link component={routerLink} to="/battle" sx={{ ...TITLE_STYLE }}>
          BATTLE
        </Link>
      </MenuItem>
      <MenuItem>
        <Link component={routerLink} to="/herodex" sx={{ ...TITLE_STYLE }}>
          HERODEX
        </Link>
      </MenuItem>
    </Stack>
  );
};

export default Home;
