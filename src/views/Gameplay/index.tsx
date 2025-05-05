import { Stack, useMediaQuery, useTheme } from "@mui/material";
import SideDialog from "../../components/Gameplay/SideDialog";
import GameContextProvider from "../../store/Game";
import Header from "../../components/UI/Header";
import { GameWrapper } from "./styled.components";
import GameBoard from "../../components/Gameplay/GameBoard";
import { HEADER_HEIGHT } from "../../config/general";

const Gameplay = () => {
  const theme = useTheme();
  const windowSize = useMediaQuery(theme.breakpoints.up("lg")) ? "lg" : "sm";
  return (
    <GameContextProvider>
      <GameWrapper>
        <Header title="BATTLE" />
        <Stack
          spacing={5}
          alignItems="center"
          justifyContent="center"
          sx={{ height: `calc(100dvh - ${HEADER_HEIGHT[windowSize]}px)` }}
        >
          <GameBoard />
        </Stack>
      </GameWrapper>
      <SideDialog />
    </GameContextProvider>
  );
};

export default Gameplay;
