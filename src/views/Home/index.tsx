import { Stack, Box } from "@mui/material";
import { Link } from "react-router";
import {
  HomeBackground,
  VersusEmblem,
  HomeTitle,
  HomeTagline,
  HomeMenu,
  MenuIcon,
} from "./styled.components";
import { EB_BG, EB_BODY_FONT, EB_TEXT, EB_TEXT_MUTED } from "@/config/general";
import { HOME_PAGE_CONTENT } from "@/config/pages";

const Home = () => {
  return (
    <Stack
      component="main"
      sx={{
        minHeight: "100dvh",
        position: "relative",
        overflow: "hidden",
        background: EB_BG,
        color: EB_TEXT,
        fontFamily: EB_BODY_FONT,
      }}
    >
      <HomeBackground />
      <Stack
        sx={{
          position: "relative",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: "48px",
          padding: "64px 24px",
        }}
      >
        <Stack sx={{ alignItems: "center", gap: "20px", textAlign: "center" }}>
          <VersusEmblem />
          <HomeTitle />
          <HomeTagline>Heroes · Villains · Five rounds</HomeTagline>
        </Stack>
        <HomeMenu>
          {HOME_PAGE_CONTENT.map((item) => (
            <Link
              key={item.text}
              to={item.link}
              className={item.primary ? "primary" : undefined}
            >
              <span>{item.text}</span>
              <MenuIcon link={item.link} />
            </Link>
          ))}
        </HomeMenu>
      </Stack>
      <Box
        component="footer"
        sx={{
          position: "relative",
          padding: "20px 24px",
          textAlign: "center",
          fontSize: "15px",
          color: EB_TEXT_MUTED,
        }}
      >
        Beat your opponent's defence and survive their attack to win the battle.
      </Box>
    </Stack>
  );
};

export default Home;
