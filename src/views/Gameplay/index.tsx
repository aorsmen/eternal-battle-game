import { Stack } from "@mui/material";
import SideDialog from "../../components/Gameplay/SideDialog";
import GameContextProvider from "../../store/Game";
import SideHands from "../../components/Gameplay/SideHands";
import GameHeader from "../../components/Gameplay/GameHeader";
import { GameWrapper, BoardWrapper } from "./styled.components";
import SideBoard from "../../components/Gameplay/SideBoard";

const Gameplay = () => {
  return (
    <GameContextProvider>
      <GameWrapper>
        <GameHeader />
        <Stack
          spacing={5}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "calc(100% - 64px)" }}
        >
          <BoardWrapper>
            <SideBoard side="computer" />
            <SideHands />
            <SideBoard side="player" />
          </BoardWrapper>
        </Stack>
      </GameWrapper>
      <SideDialog />
    </GameContextProvider>
  );
};

export default Gameplay;
