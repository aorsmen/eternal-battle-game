import { useState, useEffect, useCallback } from "react";
import useGameContext from "../../../hooks/useGameContext";
import { SideHandGrid } from "./styled.components";
import SingleBattle from "../SingleBattle";
import NextRoundDialog from "../NextRoundDialog";
import RoundStartDialog from "../RoundStartDialog";

const SideHands = () => {
  const { hands, roundWinner, rounds, currentRound, sides } = useGameContext();
  const [nextIsOpen, setNextIsOpen] = useState(false);
  const [startIsOpen, setStartIsOpen] = useState(false);

  const startRoundHandler = useCallback(() => {
    setStartIsOpen(false);
  }, []);

  useEffect(() => {
    if (roundWinner !== null) {
      if (rounds && rounds.length < 5) {
        setNextIsOpen(true);
      }
    } else {
      if (
        rounds.length > 0 &&
        !rounds[currentRound].isStarted &&
        sides.player.type !== null
      ) {
        setStartIsOpen(true);
      }
    }
  }, [roundWinner, rounds, currentRound, sides.player.type]);

  return (
    <>
      <SideHandGrid>
        {hands.player.map((card, index) => (
          <SingleBattle key={index} index={index} />
        ))}
      </SideHandGrid>
      <NextRoundDialog
        isOpen={nextIsOpen}
        onClose={() => setNextIsOpen(false)}
      />
      <RoundStartDialog isOpen={startIsOpen} onClose={startRoundHandler} />
    </>
  );
};

export default SideHands;
