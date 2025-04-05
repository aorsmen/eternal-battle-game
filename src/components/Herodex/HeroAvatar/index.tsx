import { Avatar } from "@mui/material";

const HeroAvatar = ({
  src,
  alt,
  size,
  variant = "circular",
}: {
  src: string;
  alt: string;
  size: number;
  variant?: "circular" | "rounded" | "square";
}) => {
  return (
    <Avatar
      sx={{
        width: size,
        height: size,
      }}
      alt={alt}
      src={src}
      variant={variant}
    />
  );
};

export default HeroAvatar;
