import { Box, Avatar, styled } from "@mui/material";
import { HEADER_HEIGHT } from "../../../../config/general";

export const DetailsPanelWrapper = styled(Box)(({ theme }) => ({
  width: "25vw",
  maxWidth: "480px",
  background: "#eee",
  position: "absolute",
  [theme.breakpoints.up("lg")]: {
    top: `${HEADER_HEIGHT.lg}px`,
    height: `calc(100dvh - ${HEADER_HEIGHT.lg}px)`,
  },
  [theme.breakpoints.down("lg")]: {
    top: `${HEADER_HEIGHT.sm}px`,
    height: `calc(100dvh - ${HEADER_HEIGHT.sm}px)`,
  },
  right: 0,
  zIndex: 1000,
}));

export const ImageWrapper = ({ alt, src }: { alt: string; src: string }) => {
  return (
    <Avatar
      sx={{
        width: "100%",
        height: 300,
      }}
      alt={alt}
      src={src}
      variant="square"
    />
  );
};
