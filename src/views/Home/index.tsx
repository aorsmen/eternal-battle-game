import { Stack, Link } from "@mui/material";
import { Link as routerLink } from "react-router";
import logo from "../../assets/logo.png";
import { LogoWrapper, MenuItem } from "./styled.components";
import { BG_COLOR, TITLE_STYLE } from "../../config/general";
import { HOME_PAGE_CONTENT } from "../../config/pages";

const Home = () => {
  return (
    <Stack
      alignItems="center"
      sx={{ height: "100dvh", width: "100%", backgroundColor: BG_COLOR }}
    >
      <LogoWrapper src={logo} />
      {HOME_PAGE_CONTENT.map((item) => (
        <MenuItem key={item.text}>
          <Link component={routerLink} to={item.link} sx={{ ...TITLE_STYLE }}>
            {item.text}
          </Link>
        </MenuItem>
      ))}
    </Stack>
  );
};

export default Home;
