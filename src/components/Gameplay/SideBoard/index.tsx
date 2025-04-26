import { useEffect, useRef } from "react";
import { Typography, Stack, Box, Paper } from "@mui/material";
import gsap from "gsap";
import { GameSidesItemType, HandSidesType } from "../../../types/game.types";
import { TITLE_STYLE, VILLAIN_RED, HERO_BLUE } from "../../../config/general";
import heroIcon from "../../../assets/hero-icon.png";
import villainIcon from "../../../assets/villain-icon.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SideBoard = ({
  side,
  data,
  onComplete,
}: {
  side: HandSidesType;
  data: GameSidesItemType;
  onComplete?: () => void;
}) => {
  const { name, score, type, lastScore } = data;
  const pointRef = useRef(null);
  const color = type === "heroes" ? HERO_BLUE : VILLAIN_RED;
  const scoreHasChanged = lastScore !== null && lastScore > 0;

  useEffect(() => {
    if (scoreHasChanged) {
      gsap.fromTo(
        pointRef.current,
        { x: 0, opacity: 1, scale: 1 },
        {
          x: side === "computer" ? 48 : -48,
          scale: 1.5,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete,
        }
      );
    }
  }, [onComplete, scoreHasChanged, side]);

  return (
    <>
      {type !== null && (
        <Paper
          sx={{
            padding: "10px 15px",
            border: `1px solid ${color}`,
            backgroundColor: "transparent",
          }}
        >
          <Stack
            direction={side === "computer" ? "row" : "row-reverse"}
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction={side === "computer" ? "row" : "row-reverse"}
              alignItems="center"
              spacing={2}
            >
              <Box sx={{ width: "42px", height: "42px" }}>
                <LazyLoadImage
                  alt={type || ""}
                  height={42}
                  width={42}
                  src={type === "heroes" ? heroIcon : villainIcon}
                />
              </Box>
              <Typography
                sx={{ ...TITLE_STYLE, fontSize: "24px" }}
                color="primary"
              >
                {name}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: "28px", color }}>{score}</Typography>
            {scoreHasChanged && (
              <Typography
                ref={pointRef}
                sx={{
                  fontSize: "24px",
                  color,
                  fontWeight: "bold",
                  pointerEvents: "none",
                }}
              >{`+${lastScore}`}</Typography>
            )}
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default SideBoard;
