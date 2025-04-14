import { Box, Link, Stack } from "@mui/material";
import Header from "../../components/UI/Header";
import { TitleStyle, TextStyle } from "./styled.components";
import GitHubIcon from "@mui/icons-material/GitHub";
import { CREDITS_CONTENT } from "../../config/pages";

const Credits = () => {
  return (
    <Box>
      <Header title="CREDITS" />
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "calc(100dvh - 64px)" }}
        spacing="40px"
      >
        {CREDITS_CONTENT.map((section, inx) => {
          return (
            <Box key={inx}>
              <TitleStyle>{section.title}</TitleStyle>
              {section.text.map((text, index) => (
                <TextStyle key={index}>{text}</TextStyle>
              ))}
            </Box>
          );
        })}
        <Box sx={{ textAlign: "center" }}>
          <Link
            href="https://github.com/aorsmen/eternal-battle-game"
            target="_blank"
          >
            <GitHubIcon sx={{ color: "#fff", fontSize: 50 }} />
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default Credits;
