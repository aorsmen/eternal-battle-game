import { useState, useEffect } from "react";
import useGameContext from "../../../hooks/useGameContext";
import { SideHandGrid } from "./styled.components";
import SingleBattle from "../SingleBattle";
import NextRoundDialog from "../NextRoundDialog";

const SideHands = () => {
  const { hands, roundWinner } = useGameContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (roundWinner !== null) {
      setIsOpen(true);
    }
  }, [roundWinner]);

  return (
    <>
      <SideHandGrid>
        {hands.player.map((card, index) => (
          <SingleBattle key={index} index={index} />
        ))}
      </SideHandGrid>
      <NextRoundDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SideHands;
