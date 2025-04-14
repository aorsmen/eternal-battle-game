import { Stack } from "@mui/material";
import SideDialog from "../../components/Gameplay/SideDialog";
import GameContextProvider from "../../store/Game";
import Header from "../../components/UI/Header";
import { GameWrapper } from "./styled.components";
import GameBoard from "../../components/Gameplay/GameBoard";

const Gameplay = () => {
  return (
    <GameContextProvider>
      <GameWrapper>
        <Header title="BATTLE" />
        <Stack
          spacing={5}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "calc(100% - 64px)" }}
        >
          <GameBoard />
        </Stack>
      </GameWrapper>
      <SideDialog />
    </GameContextProvider>
  );
};

export default Gameplay;
