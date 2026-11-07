import { useState } from "react";
import { Stack, Typography, Box, Fade } from "@mui/material";
import {
  EB_BG,
  EB_HERO,
  EB_VILLAIN,
  EB_TEXT,
  EB_TEXT_SUBTLE,
  EB_CARD_FACE,
  EB_HERO_ART_BG,
  EB_VILLAIN_ART_BG,
  EB_LABEL_FONT,
  EB_DISPLAY_FONT,
  EB_BODY_FONT,
  HERO_CARD_WIDTH,
  HERO_CARD_HEIGHT,
} from "@/config/general";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

type Alignment = "good" | "bad";
type Size = "sm" | "lg";

const accentColor = (alignment: Alignment) =>
  alignment === "good" ? EB_HERO : EB_VILLAIN;

export const HeroCardWrapper = ({
  children,
  alignment,
  size,
}: {
  children: React.ReactNode;
  alignment: Alignment;
  size: Size;
}) => {
  return (
    <Stack
      sx={{
        width: `${HERO_CARD_WIDTH[size]}px`,
        height: `${HERO_CARD_HEIGHT[size]}px`,
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        gap: size === "lg" ? "8px" : "5px",
        padding: size === "lg" ? "10px" : "6px",
        backgroundColor: EB_CARD_FACE,
        borderRadius: size === "lg" ? "14px" : "10px",
        border: `2px solid ${accentColor(alignment)}`,
        color: EB_TEXT,
        fontFamily: EB_BODY_FONT,
        textAlign: "left",
      }}
    >
      {children}
    </Stack>
  );
};

export const HeroCardName = ({ name, size }: { name: string; size: Size }) => {
  return (
    <Typography
      component="span"
      title={name}
      sx={{
        fontFamily: EB_LABEL_FONT,
        fontWeight: 700,
        fontSize: size === "lg" ? "19px" : "13px",
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        lineHeight: 1.1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {name}
    </Typography>
  );
};

const FILL_IMAGE = {
  position: "absolute",
  inset: 0,
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top",
} as const;

export const HeroCardArt = ({
  alt,
  src,
  plc,
  alignment,
}: {
  alt: string;
  src: string;
  plc: string;
  alignment: Alignment;
}) => {
  // Track which src has loaded, so a new src starts hidden again
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isLoaded = loadedSrc === src;

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        borderRadius: "9px",
        overflow: "hidden",
        position: "relative",
        backgroundColor:
          alignment === "good" ? EB_HERO_ART_BG : EB_VILLAIN_ART_BG,
      }}
    >
      {/* Small image shows at once; both images fill the box absolutely, so
          neither can change its size while loading */}
      <Box component="img" src={plc} alt="" aria-hidden="true" sx={FILL_IMAGE} />
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        data-loaded={isLoaded}
        onLoad={() => setLoadedSrc(src)}
        sx={{
          ...FILL_IMAGE,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </Box>
  );
};

export const HeroCardRole = ({ text, size }: { text: string; size: Size }) => {
  return (
    <Typography
      component="span"
      title={text}
      sx={{
        fontFamily: EB_BODY_FONT,
        fontSize: size === "lg" ? "13px" : "11px",
        lineHeight: 1.25,
        color: EB_TEXT_SUBTLE,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </Typography>
  );
};

const AttackIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" />
  </svg>
);

const DefenseIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const StatTile = ({
  label,
  value,
  icon,
  size,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  size: Size;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: EB_BG,
        borderRadius: size === "lg" ? "8px" : "6px",
        padding: size === "lg" ? "5px 8px" : "3px 6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "4px",
        minWidth: 0,
      }}
    >
      <Box
        component="small"
        sx={{
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: size === "lg" ? "12px" : "10px",
          letterSpacing: "0.1em",
          color: EB_TEXT_SUBTLE,
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {icon}
        {label}
      </Box>
      <Box
        component="b"
        data-testid={`hero-card-${label.toLowerCase()}`}
        sx={{
          fontFamily: EB_DISPLAY_FONT,
          fontWeight: 400,
          fontSize: size === "lg" ? "28px" : "18px",
          lineHeight: 1,
          color: "#FFFFFF",
        }}
      >
        {value}
      </Box>
    </Box>
  );
};

export const HeroCardStats = ({
  attack,
  defense,
  size,
}: {
  attack: number;
  defense: number;
  size: Size;
}) => {
  const iconSize = size === "lg" ? 12 : 10;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: size === "lg" ? "6px" : "4px",
      }}
    >
      <StatTile
        label="ATK"
        value={attack}
        icon={<AttackIcon size={iconSize} />}
        size={size}
      />
      <StatTile
        label="DEF"
        value={defense}
        icon={<DefenseIcon size={iconSize} />}
        size={size}
      />
    </Box>
  );
};

export const ImagePreview = ({
  alt,
  src,
  show,
  size,
  onOpen,
  onClose,
}: {
  alt: string;
  src: string;
  show: boolean;
  size: Size;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const top = size === "lg" ? "40px" : "26px";
  const right = size === "lg" ? "16px" : "10px";
  return (
    <>
      <Box
        className="nodrag"
        onClick={onOpen}
        sx={{
          position: "absolute",
          top,
          right,
          width: size === "lg" ? "28px" : "22px",
          height: size === "lg" ? "28px" : "22px",
          borderRadius: "999px",
          backgroundColor: "rgb(14 17 22 / 70%)",
          color: EB_TEXT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        <VisibilityIcon sx={{ fontSize: size === "lg" ? "18px" : "14px" }} />
      </Box>
      {show && (
        <Fade in={show} className="nodrag">
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              backgroundColor: EB_BG,
              zIndex: 2,
            }}
            onClick={onClose}
            onMouseLeave={onClose}
          >
            <Box component="img" src={src} alt={alt} sx={FILL_IMAGE} />
            <CloseIcon
              fontSize="small"
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: EB_TEXT,
                backgroundColor: "rgb(14 17 22 / 70%)",
                borderRadius: "999px",
                padding: "2px",
              }}
            />
          </Box>
        </Fade>
      )}
    </>
  );
};
