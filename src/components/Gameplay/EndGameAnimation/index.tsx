import { Box, Stack } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import {
  EB_BODY_FONT,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_HERO,
  EB_LABEL_FONT,
  EB_OVERLAY,
  EB_TEXT,
  EB_TEXT_SUBTLE,
  EB_VILLAIN,
} from "@/config/general";
import { ROUND_COUNT } from "@/config/game";
import useGameContext from "@/hooks/useGameContext";
import { getGameResult } from "@/helpers/game";
import ActionButton, { ArrowIcon, PlusIcon } from "@/components/UI/ActionButton";

type ParticleType = {
  id: number;
  x: number;
  y: number;
  scale: number;
  delay: number;
};

const PARTICLE_COUNT = 120;

const generateParticles = (count: number): ParticleType[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 640 - 320,
    y: Math.random() * 400 - 200,
    scale: Math.random() * 0.8 + 0.6,
    delay: Math.random() * 0.3,
  }));

const EndGameAnimation = ({ onClose }: { onClose: () => void }) => {
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const { sides, startNewGame } = useGameContext();
  const { winner, title, message } = getGameResult(sides);
  const isVictory = winner === "player";
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    )
      .fromTo(
        titleRef.current,
        { scale: 0.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.2"
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

    if (isVictory) {
      particles.forEach((p, i) => {
        gsap.fromTo(
          particlesRef.current[i],
          { x: 0, y: 0, opacity: 1, scale: 1 },
          {
            x: p.x,
            y: p.y,
            scale: p.scale,
            opacity: 0,
            duration: 2,
            delay: 0.6 + p.delay,
            ease: "power2.out",
          }
        );
      });
    }

    return () => {
      tl.kill();
    };
  }, [isVictory, particles]);

  return (
    <Stack
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="end-game-title"
      data-testid="end-game"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "24px",
        backgroundColor: EB_OVERLAY,
        color: EB_TEXT,
        fontFamily: EB_BODY_FONT,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {isVictory &&
        particles.map((p, i) => (
          <Box
            key={p.id}
            aria-hidden="true"
            ref={(el: HTMLDivElement | null) => {
              particlesRef.current[i] = el;
            }}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "6px",
              height: "6px",
              marginTop: "-3px",
              marginLeft: "-3px",
              borderRadius: "50%",
              opacity: 0,
              backgroundColor: [EB_HERO, EB_VILLAIN, EB_GOLD][i % 3],
              pointerEvents: "none",
            }}
          />
        ))}
      <Box
        component="span"
        sx={{
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: { xs: "14px", sm: "16px" },
          letterSpacing: "0.24em",
          color: EB_TEXT_SUBTLE,
        }}
      >
        {`FINAL RESULT · ${ROUND_COUNT} ROUNDS`}
      </Box>
      <Box
        ref={titleRef}
        component="h1"
        id="end-game-title"
        sx={{
          margin: 0,
          fontFamily: EB_DISPLAY_FONT,
          fontWeight: 400,
          fontSize: "clamp(64px, 14vw, 160px)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          color: EB_GOLD,
        }}
      >
        {title}
      </Box>
      <Stack ref={textRef} sx={{ alignItems: "center", gap: "28px" }}>
        <Box
          component="p"
          sx={{ margin: 0, fontSize: { xs: "17px", sm: "20px" } }}
        >
          {message}
        </Box>
        <Stack
          direction="row"
          sx={{ justifyContent: "center", gap: "14px", flexWrap: "wrap" }}
        >
          <ActionButton onClick={onClose} icon={<ArrowIcon />}>
            See game summary
          </ActionButton>
          <ActionButton
            variant="ghost"
            onClick={() => startNewGame()}
            icon={<PlusIcon />}
          >
            New game
          </ActionButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EndGameAnimation;
