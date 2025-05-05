import { useState, useEffect, useCallback } from "react";
import { useMediaQuery, useTheme, Box } from "@mui/material";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useGameContext from "../../../hooks/useGameContext";
import SingleBattle from "../SingleBattle";
import NextRoundDialog from "../NextRoundDialog";
import RoundStartDialog from "../RoundStartDialog";
import { HERO_CARD_WIDTH } from "../../../config/general";

const SideHands = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
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
    <Box sx={{ marginBlock: matches ? "30px" : "10px" }}>
      <Splide
        options={{
          perPage: matches ? 5 : 2,
          fixedWidth: matches ? HERO_CARD_WIDTH.lg : HERO_CARD_WIDTH.sm,
          gap: matches ? "16px" : "8px",
          pagination: false,
          arrows: false,
          padding: matches ? {} : { left: "8px", right: "8px" },
          drag: "free",
        }}
      >
        {hands.player.map((card, index) => (
          <SplideSlide key={index}>
            <SingleBattle index={index} />
          </SplideSlide>
        ))}
      </Splide>
      <NextRoundDialog
        isOpen={nextIsOpen}
        onClose={() => setNextIsOpen(false)}
      />
      <RoundStartDialog isOpen={startIsOpen} onClose={startRoundHandler} />
    </Box>
  );
};

export default SideHands;
