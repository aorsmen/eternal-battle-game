import SideHands from "../../../components/Gameplay/SideHands";
import { BoardWrapper } from "./styled.components";
import SideBoard from "../../../components/Gameplay/SideBoard";
import useGameContext from "../../../hooks/useGameContext";

const GameBoard = () => {
  const { sides } = useGameContext();

  return (
    <BoardWrapper>
      <SideBoard side="computer" data={sides.computer} />
      <SideHands />
      <SideBoard side="player" data={sides.player} />
    </BoardWrapper>
  );
};

export default GameBoard;
