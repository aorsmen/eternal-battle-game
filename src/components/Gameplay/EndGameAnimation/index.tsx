import {
  Stack,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HandSidesType } from "../../../types/game.types";
import {
  TITLE_STYLE,
  YELLOW,
  VICTORY_COLOR,
  DEFEAT_COLOR,
  BROWN_LIGHT,
  HERO_BLUE,
  VILLAIN_RED,
} from "../../../config/general";
import { GAME_DRAW_MESSAGE, GAME_WIN_MESSAGE } from "../../../config/game";
import useGameContext from "../../../hooks/useGameContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import heroIcon from "../../../assets/hero-icon.png";
import villainIcon from "../../../assets/villain-icon.png";
import { HEADER_HEIGHT } from "../../../config/general";

type ParticleType = {
  id: number;
  x: number;
  y: number;
  scale: number;
  delay: number;
};

const generateParticles = (count: number): ParticleType[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    scale: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 0.3,
  }));

const EndGameAnimation = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme();
  const windowSize = useMediaQuery(theme.breakpoints.up("lg")) ? "lg" : "sm";
  const overlayRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef<ParticleType[]>([]);
  const particles = generateParticles(500);
  const { sides, startNewGame } = useGameContext();
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

    if (gameWinner === "player") {
      particles.forEach((p, i) => {
        gsap.fromTo(
          particlesRef.current[i],
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
          },
          {
            x: p.x,
            y: p.y,
            scale: p.scale,
            opacity: 0,
            duration: 2,
            delay: p.delay,
            ease: "power2.out",
          }
        );
      });
    }
  }, []);

  return (
    <Stack
      ref={overlayRef}
      alignItems="center"
      justifyContent="center"
      spacing={2}
      style={{
        position: "fixed",
        top: `${HEADER_HEIGHT[windowSize]}px`,
        left: 0,
        width: "100%",
        height: `calc(100vh - ${HEADER_HEIGHT[windowSize]}px)`,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 999,
      }}
    >
      {gameWinner === "player" &&
        particles.map((p, i) => (
          <Box
            key={p.id}
            ref={(el) => {
              particlesRef.current[i] = el as ParticleType;
            }}
            style={{
              position: "absolute",
              width: "5px",
              height: "5px",
              backgroundColor: i % 2 === 0 ? HERO_BLUE : VILLAIN_RED,
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
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
      <Stack
        ref={textRef}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Typography sx={{ color: YELLOW, fontSize: "24px" }}>
          {textMsg}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Button variant="contained" color="primary" onClick={onClose}>
            Game Summary
          </Button>
          <Button variant="contained" color="warning" onClick={startNewGame}>
            Start New Game
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EndGameAnimation;
