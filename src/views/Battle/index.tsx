import { Outlet } from "react-router";
import GameContextProvider from "@/store/Game";

// Shares game state between side selection (/battle) and board (/battle/play)
const Battle = () => {
  return (
    <GameContextProvider>
      <Outlet />
    </GameContextProvider>
  );
};

export default Battle;
