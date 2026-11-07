import { useRef, useEffect, useLayoutEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import gsap from "gsap";
import { CardSpot } from "./styled.components";
import HeroCard from "@/components/HeroCard";
import HeroCardBack from "@/components/HeroCardBack";
import useGameContext from "@/hooks/useGameContext";
import { BattleResultType } from "@/types/game.types";
import { EB_GOLD, EB_GOLD_GLOW } from "@/config/general";

const PlayerCardMotion = ({
  index,
  isFlipped,
  isRevealed,
  result,
  onClick,
}: {
  index: number;
  isFlipped: boolean;
  isRevealed: boolean;
  result: BattleResultType;
  onClick: () => void;
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const windowSize = matches ? "lg" : "sm";
  const { hands } = useGameContext();
  const data = hands.player[index];
  const cardRef = useRef(null);

  // Layout effect, not a plain effect: cards are dealt by the store's draw
  // effects, and React paints those renders before running useEffect, so the
  // card would flash at its final spot before jumping off-screen to fly in
  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      cardRef.current,
      { y: "100vw" },
      { y: 0, duration: 1, ease: "power3.out" }
    );

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (result === "win") {
      gsap
        .timeline()
        .fromTo(
          cardRef.current,
          { boxShadow: `0 0 0 0px ${EB_GOLD}, 0 0 0px ${EB_GOLD_GLOW}` },
          {
            boxShadow: `0 0 0 3px ${EB_GOLD}, 0 0 28px ${EB_GOLD_GLOW}`,
            duration: 0.5,
            repeat: 3,
            yoyo: true,
          }
        )
        .to(cardRef.current, {
          boxShadow: `0 0 0 3px ${EB_GOLD}, 0 0 0px ${EB_GOLD_GLOW}`,
          duration: 0.3,
        });
    } else if (result === "lose") {
      const tl = gsap.timeline();
      tl.to(cardRef.current, {
        x: "+=5",
        duration: 0.05,
        repeat: 5,
        yoyo: true,
      }).to(cardRef.current, {
        opacity: 0.3,
        filter: "grayscale(1)",
        duration: 1,
        ease: "power2.in",
      });
    }
  }, [result]);

  const flipCard = () => {
    gsap.fromTo(
      cardRef.current,
      { rotateY: 180 },
      { rotateY: 360, duration: 1 }
    );
    onClick();
  };

  return (
    <CardSpot
      data-testid="player-card-wrapper"
      ref={cardRef}
      aria-label={!isRevealed ? `Reveal card ${index + 1}` : undefined}
      onClick={!isFlipped ? flipCard : undefined}
    >
      {isRevealed ? (
        <HeroCard data={data} />
      ) : (
        <HeroCardBack
          alignment={data.biography.alignment}
          size={windowSize}
          testId="player-card-back"
          revealable={!isFlipped}
        />
      )}
    </CardSpot>
  );
};

export default PlayerCardMotion;
