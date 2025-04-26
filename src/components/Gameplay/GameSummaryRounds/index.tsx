import { Box, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useGameContext from "../../../hooks/useGameContext";
import HeroCard from "../../HeroCard";
import { DEFEAT_STYLE } from "../../../config/general";
import { RoundsScoller, RoundWrapper } from "./styled.components";

gsap.registerPlugin(ScrollTrigger);

const GameSummaryRounds = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeRound, setActiveRound] = useState(0);
  const { rounds } = useGameContext();

  const setRound = (
    trigger: Element | undefined,
    sections: HTMLDivElement[]
  ) => {
    if (trigger) {
      const inx = sections.indexOf(trigger as HTMLDivElement);

      setActiveRound(inx);
    }
  };

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLDivElement>(".round-wrapper");

    sections.forEach((roundEl) => {
      ScrollTrigger.create({
        trigger: roundEl,
        scroller: scrollContainerRef.current,
        start: "-=20px left",
        end: "right left",
        horizontal: true,
        onEnter: (self) => setRound(self.trigger, sections),
        onEnterBack: (self) => setRound(self.trigger, sections),
        onLeave: (self) => setRound(self.trigger, sections),
        onLeaveBack: (self) => setRound(self.trigger, sections),
      });
    });

    ScrollTrigger.refresh();

    return () => ScrollTrigger.killAll();
  }, [rounds]);

  return (
    <RoundsScoller ref={scrollContainerRef}>
      {rounds.map((round, i) => (
        <RoundWrapper key={i} index={i} active={activeRound}>
          {round.battles.map((battle, j) => {
            const playerStyle =
              battle.winner === "computer" ? DEFEAT_STYLE : {};
            const computerStyle =
              battle.winner === "player" ? DEFEAT_STYLE : {};

            return (
              <Stack spacing={2} key={j}>
                <Box sx={computerStyle}>
                  <HeroCard data={battle.cards.computer} />
                </Box>
                <Box sx={playerStyle}>
                  <HeroCard data={battle.cards.player} />
                </Box>
              </Stack>
            );
          })}
        </RoundWrapper>
      ))}
    </RoundsScoller>
  );
};

export default GameSummaryRounds;
