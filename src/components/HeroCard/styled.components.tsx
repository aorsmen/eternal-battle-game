import { Stack, Typography, Box, Paper, Fade } from "@mui/material";
import {
  YELLOW_LIGHT,
  YELLOW_DARK,
  HERO_BLUE_DARK,
  VILLAIN_RED_DARK,
  HERO_CARD_WIDTH,
  HERO_CARD_HEIGHT,
} from "../../config/general";
import { LazyLoadImage } from "react-lazy-load-image-component";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import heroIcon from "../../assets/hero-dark-mini-icon.png";
import villainIcon from "../../assets/villain-dark-mini-icon.png";

export const HeroCardWrapper = ({
  children,
  alignment,
  size,
}: {
  children: React.ReactNode;
  alignment: "good" | "bad";
  size: "sm" | "lg";
}) => {
  return (
    <Stack
      sx={{
        width: `${HERO_CARD_WIDTH[size]}px`,
        height: `${HERO_CARD_HEIGHT[size]}px`,
        position: "relative",
        backgroundColor: YELLOW_DARK,
        borderRadius: "5px",
        border: `10px solid ${
          alignment === "good" ? HERO_BLUE_DARK : VILLAIN_RED_DARK
        }`,
      }}
    >
      {children}
    </Stack>
  );
};

export const HeroCardHeader = ({ name }: { name: string }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        padding: "5px 10px",
        borderRadius: "5px 5px 0 0",
      }}
    >
      <Typography sx={{ fontSize: "14px" }}>{name}</Typography>
    </Stack>
  );
};

export const HeroCardBody = ({ children }: { children: React.ReactNode }) => {
  return <Stack sx={{ paddingInline: "10px", flex: 1 }}>{children}</Stack>;
};

export const HeroCardFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={{ padding: "10px" }}
    >
      {children}
    </Stack>
  );
};

export const InfoWrapper = ({ text }: { text: string }) => {
  return (
    <Box
      sx={{
        borderRadius: "4px",
        backgroundColor: YELLOW_LIGHT,
        flex: 1,
        padding: "5px",
      }}
    >
      {text !== "-" && (
        <Typography
          sx={{
            fontSize: "12px",
            fontStyle: "italic",
            overflow: "auto",
            height: "60px",
            textAlign: "center",
            scrollbarColor: `${YELLOW_DARK} ${YELLOW_LIGHT}`,
            scrollbarWidth: "thin",
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

export const ImageWrapper = ({
  alt,
  src,
  plc,
  size,
}: {
  alt: string;
  src: string;
  plc: string;
  size: "sm" | "lg";
}) => {
  const height = size === "lg" ? 345 : 213;
  const width = size === "lg" ? 230 : 142;
  return (
    <Box
      sx={{
        overflow: "hidden",
        borderRadius: "5px",
        height: size === "lg" ? "175px" : "128px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <LazyLoadImage
          alt={alt}
          height={height}
          src={src}
          width={width}
          placeholderSrc={plc}
        />
      </Box>
    </Box>
  );
};

export const ImagePreview = ({
  alt,
  src,
  show,
  alignment,
  size,
  onOpen,
  onClose,
}: {
  alt: string;
  src: string;
  show: boolean;
  alignment: "good" | "bad";
  size: "sm" | "lg";
  onOpen: () => void;
  onClose: () => void;
}) => {
  const height = size === "lg" ? "350px" : "230px";
  const width = size === "lg" ? "250px" : "162px";
  return (
    <>
      <VisibilityIcon
        fontSize="small"
        className="nodrag"
        sx={{
          position: "absolute",
          top: "7px",
          right: "10px",
          color: alignment === "good" ? HERO_BLUE_DARK : VILLAIN_RED_DARK,
        }}
        onClick={onOpen}
      />
      {show && (
        <Fade in={show} className="nodrag">
          <Paper
            sx={{
              height,
              width,
              position: "absolute",
              left: 0,
              top: 0,
              overflow: "hidden",
            }}
            onClick={onClose}
            onMouseLeave={onClose}
          >
            <LazyLoadImage alt={alt} height={height} src={src} width={width} />
            <CloseIcon
              fontSize="small"
              sx={{ position: "absolute", top: "10px", right: "10px" }}
            />
          </Paper>
        </Fade>
      )}
    </>
  );
};

export const AlignmentWrapper = ({
  alignment,
  isMobile,
}: {
  alignment: "good" | "bad";
  isMobile: boolean;
}) => {
  const bottom = isMobile
    ? {
        borderBottom: `1px solid rgb(0 0 0 / 40%)`,
      }
    : {};
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "32px", ...bottom }}
    >
      <Typography sx={{ fontSize: "12px" }}>
        {`${alignment === "good" ? "Hero" : "Villain"}`}
      </Typography>
      <Box sx={{ width: "24px", height: "24px" }}>
        <LazyLoadImage
          alt={alignment === "good" ? "Hero" : "Villain"}
          height={24}
          width={24}
          src={alignment === "good" ? heroIcon : villainIcon}
        />
      </Box>
    </Stack>
  );
};
