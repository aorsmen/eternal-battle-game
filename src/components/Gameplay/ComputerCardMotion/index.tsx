import { useRef, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import gsap from "gsap";
import { CardSpot } from "./styled.components";
import HeroCard from "../../HeroCard";
import { HeroCardBack } from "./styled.components";
import useGameContext from "../../../hooks/useGameContext";
import { BattleResultType } from "../../../types/game.types";
import {
  VILLAIN_RED_DARK,
  HERO_BLUE_DARK,
  DEFEAT_STYLE,
} from "../../../config/general";

const ComputerCardMotion = ({
  index,
  isFlipped,
  isRevealed,
  result,
}: {
  index: number;
  isFlipped: boolean;
  isRevealed: boolean;
  result: BattleResultType;
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const windowSize = matches ? "lg" : "sm";
  const { hands } = useGameContext();
  const data = hands.computer[index];
  const alignment = data.biography.alignment;
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: "-100vw" },
      { y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (isFlipped) {
      gsap.fromTo(
        cardRef.current,
        { rotateY: 180 },
        { rotateY: 360, duration: 1 }
      );
    }
  }, [isFlipped]);

  useEffect(() => {
    if (result === "win") {
      gsap.to(cardRef.current, {
        boxShadow: `0 0 5px 5px ${
          alignment === "good" ? HERO_BLUE_DARK : VILLAIN_RED_DARK
        }`,
        duration: 0.5,
        repeat: 3,
        yoyo: true,
      });
    } else if (result === "lose") {
      const tl = gsap.timeline();
      tl.to(cardRef.current, {
        x: "+=5",
        duration: 0.05,
        repeat: 5,
        yoyo: true,
      }).to(cardRef.current, {
        ...DEFEAT_STYLE,
        duration: 1,
        ease: "power2.in",
      });
    }
  }, [result]);

  return (
    <CardSpot data-testid="computer-card-wrapper" ref={cardRef}>
      {isRevealed ? (
        <HeroCard data={data} />
      ) : (
        <HeroCardBack alignment={data.biography.alignment} size={windowSize} />
      )}
    </CardSpot>
  );
};

export default ComputerCardMotion;
