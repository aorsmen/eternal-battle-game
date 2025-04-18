import { styled } from "@mui/material";
import { Box, Avatar } from "@mui/material";

export const DetailsPanelWrapper = styled(Box)`
  width: 25vw;
  max-width: 480px;
  background: #eee;
  position: absolute;
  top: 64px;
  right: 0;
  height: calc(100% - 64px);
  z-index: 1000;
`;

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
