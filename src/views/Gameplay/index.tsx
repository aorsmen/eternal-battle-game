import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Navigate } from "react-router";
import Header from "@/components/UI/Header";
import { GameWrapper } from "./styled.components";
import GameBoard from "@/components/Gameplay/GameBoard";
import useGameContext from "@/hooks/useGameContext";
import { HEADER_HEIGHT } from "@/config/general";

const Gameplay = () => {
  const theme = useTheme();
  const windowSize = useMediaQuery(theme.breakpoints.up("lg")) ? "lg" : "sm";
  const { sides } = useGameContext();

  // No side picked yet (direct visit or "New game"): go to side selection
  if (sides.player.type === null) {
    return <Navigate to="/battle" replace />;
  }

  return (
    <GameWrapper>
      <Header title="BATTLE" />
      <Stack
        spacing={5}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: `calc(100dvh - ${HEADER_HEIGHT[windowSize]}px)`,
        }}
      >
        <GameBoard />
      </Stack>
    </GameWrapper>
  );
};

export default Gameplay;
