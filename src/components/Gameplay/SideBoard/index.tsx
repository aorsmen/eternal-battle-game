import { useEffect, useRef } from "react";
import {
  Typography,
  Stack,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { name, score, type, lastScore } = data;
  const pointRef = useRef(null);
  const color = type === "heroes" ? HERO_BLUE : VILLAIN_RED;
  const scoreHasChanged = lastScore !== null && lastScore > 0;
  const avatarSize = matches ? 42 : 24;

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
            padding: matches ? "10px 15px" : "5px 8px",
            border: `1px solid ${matches ? color : "transparent"}`,
            backgroundColor: "transparent",
          }}
          elevation={0}
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
              <Box
                sx={{ flex: `0 0 ${avatarSize}px`, height: `${avatarSize}px` }}
              >
                <LazyLoadImage
                  alt={type || ""}
                  height={avatarSize}
                  width={avatarSize}
                  src={type === "heroes" ? heroIcon : villainIcon}
                />
              </Box>
              <Typography
                sx={{ ...TITLE_STYLE, fontSize: matches ? "24px" : "16px" }}
                color="primary"
              >
                {name}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: matches ? "28px" : "18px", color }}>
              {score}
            </Typography>
            {scoreHasChanged && (
              <Typography
                ref={pointRef}
                sx={{
                  fontSize: matches ? "24px" : "16px",
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
