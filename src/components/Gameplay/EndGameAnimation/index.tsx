import { Stack, Typography, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HandSidesType } from "../../../types/game.types";
import {
  TITLE_STYLE,
  VILLAIN_RED,
  HERO_BLUE,
  YELLOW,
  VICTORY_COLOR,
  DEFEAT_COLOR,
  BROWN_LIGHT,
} from "../../../config/general";
import { GAME_DRAW_MESSAGE, GAME_WIN_MESSAGE } from "../../../config/game";
import useGameContext from "../../../hooks/useGameContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import heroIcon from "../../../assets/hero-icon.png";
import villainIcon from "../../../assets/villain-icon.png";

const EndGameAnimation = ({ onClose }: { onClose: () => void }) => {
  const overlayRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const { sides } = useGameContext();
  let textMsg = GAME_DRAW_MESSAGE;
  let textColor = BROWN_LIGHT;
  let gameWinner: HandSidesType | "draw" = "draw";
  let heroText = "Draw!";

  if (sides.player.score > sides.computer.score) {
    gameWinner = "player";
    textMsg = GAME_WIN_MESSAGE.replace("{WINNER}", sides.player.name);
    textColor = VICTORY_COLOR;
    heroText = "Victory!";
  } else if (sides.player.score < sides.computer.score) {
    gameWinner = "computer";
    textMsg = GAME_WIN_MESSAGE.replace("{WINNER}", sides.computer.name);
    textColor = DEFEAT_COLOR;
    heroText = "Defeat!";
  }

  const animationCompleteHandler = () => {};

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: animationCompleteHandler });

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    tl.fromTo(
      heroRef.current,
      { scale: 0.2, opacity: 0 },
      {
        scale: 1.5,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );

    tl.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <Stack
      ref={overlayRef}
      alignItems="center"
      justifyContent="center"
      spacing={2}
      style={{
        position: "fixed",
        top: "64px",
        left: 0,
        width: "100%",
        height: "calc(100vh - 64px)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 999,
      }}
    >
      <Typography
        sx={{
          ...TITLE_STYLE,
          fontSize: "48px",
          color: textColor,
          textTransform: "uppercase",
        }}
        ref={heroRef}
      >
        {heroText}
      </Typography>
      {gameWinner !== "draw" && (
        <Box ref={textRef} sx={{ width: "60px", height: "60px" }}>
          <LazyLoadImage
            alt={sides[gameWinner].type || ""}
            height={60}
            width={60}
            src={sides[gameWinner].type === "heroes" ? heroIcon : villainIcon}
          />
        </Box>
      )}
      <Typography ref={textRef} sx={{ color: YELLOW, fontSize: "24px" }}>
        {textMsg}
      </Typography>
    </Stack>
  );
};

export default EndGameAnimation;
