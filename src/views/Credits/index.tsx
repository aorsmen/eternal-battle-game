import { Box, Link } from "@mui/material";
import Header from "../../components/UI/Header";
import { TitleStyle, TextStyle, SectionStyle } from "./styled.components";
import GitHubIcon from "@mui/icons-material/GitHub";

const Credits = () => {
  return (
    <Box>
      <Header title="CREDITS" />
      <SectionStyle>
        <TitleStyle>Game Design & Development</TitleStyle>
        <TextStyle>Altug Orsmen</TextStyle>
      </SectionStyle>

      <SectionStyle>
        <TitleStyle>Technology Stack</TitleStyle>
        <TextStyle>React.js. React Router & Tanstack React Query</TextStyle>
        <TextStyle>Material UI, GSAP, xyflow, Recharts</TextStyle>
      </SectionStyle>

      <SectionStyle>
        <TitleStyle>Special Thanks</TitleStyle>
        <TextStyle>Tuna Orsmen</TextStyle>
      </SectionStyle>

      <SectionStyle sx={{ marginTop: "100px" }}>
        <TextStyle>
          <Link
            href="https://github.com/aorsmen/eternal-battle-game"
            target="_blank"
          >
            <GitHubIcon sx={{ color: "#fff", fontSize: 50 }} />
          </Link>
        </TextStyle>
      </SectionStyle>
    </Box>
  );
};

export default Credits;
