import { createTheme } from "@mui/material/styles";

export const BG_COLOR = "#231f1c";
export const YELLOW = "#d89f29";
export const YELLOW_LIGHT = "#f4d143";
export const YELLOW_DARK = "#cb8c23";
export const ORANGE = "#c43715";
export const ORANGE_LIGHT = "#d34316";
export const ORANGE_DARK = "#971e13";
export const BROWN = "#78371c";
export const BROWN_DARK = "#29221f";
export const BROWN_LIGHT = "#a75f26";

export const VILLAIN_RED = "#d34038";
export const VILLAIN_RED_DARK = "#62201a";
export const HERO_BLUE = "#0a79bf";
export const HERO_BLUE_DARK = "#154376";

// Redesign palette (Eternal Battle Redesign canvas), used by Home and SideSelect
export const EB_BG = "#0E1116";
export const EB_SURFACE = "#171B22";
export const EB_BORDER = "#2A303A";
export const EB_BORDER_STRONG = "#5B6474";
export const EB_TEXT = "#EDEFF3";
export const EB_TEXT_MUTED = "#C5CBD6";
export const EB_GOLD = "#F5B83D";
export const EB_GOLD_LIGHT = "#FFD27A";
export const EB_GOLD_GLOW = "rgb(245 184 61 / 45%)";
export const EB_WHITE_RING = "rgb(255 255 255 / 25%)";
export const EB_BACKDROP = "rgb(14 17 22 / 70%)";
export const EB_OVERLAY = "rgb(14 17 22 / 88%)";
export const EB_TEXT_FAINT = "#7D8696";
export const EB_HERO_TILE_BG = "#132442";
export const EB_VILLAIN_TILE_BG = "#2E1218";
export const EB_HERO = "#3D8BFF";
export const EB_HERO_LIGHT = "#6FA8FF";
export const EB_HERO_BG = "#101C30";
export const EB_VILLAIN = "#FF4D5E";
export const EB_VILLAIN_LIGHT = "#FF6B79";
export const EB_VILLAIN_BG = "#2A1217";
export const EB_VILLAIN_TEXT_MUTED = "#E4C5C9";
export const EB_TEXT_SUBTLE = "#AEB6C3";
export const EB_CARD_FACE = "#1A1F27";
export const EB_HERO_ART_BG = "#172C4F";
export const EB_VILLAIN_ART_BG = "#45161D";
export const EB_HERO_BACK = "#13294D";
export const EB_HERO_BORDER = "#2B5FB0";
export const EB_HERO_BACK_PATTERN = "rgb(111 168 255 / 28%)";
export const EB_VILLAIN_BACK = "#3D1219";
export const EB_VILLAIN_BORDER = "#A3303D";
export const EB_VILLAIN_BACK_PATTERN = "rgb(255 107 121 / 28%)";

export const DEFEAT_COLOR = "#e91509";
export const VICTORY_COLOR = YELLOW_LIGHT;

export const gameTheme = createTheme({
  palette: {
    primary: {
      light: YELLOW_LIGHT,
      main: YELLOW,
      dark: YELLOW_DARK,
      contrastText: BG_COLOR,
    },
    secondary: {
      light: ORANGE_LIGHT,
      main: ORANGE,
      dark: ORANGE_DARK,
      contrastText: YELLOW,
    },
  },
  typography: {
    fontFamily: ['"Times New Roman"', "Times", "serif"].join(","),
  },
});

export const TITLE_STYLE = {
  fontFamily: '"Rakkas", serif',
  fontWeight: 400,
  fontStyle: "normal",
  letterSpacing: 3,
};

export const EB_DISPLAY_FONT = '"Anton", sans-serif';
export const EB_LABEL_FONT = '"Barlow Condensed", sans-serif';
export const EB_BODY_FONT = '"Barlow", sans-serif';

export const DEFEAT_STYLE = { opacity: 0.3, filter: "grayscale(1)" };
export const HERO_CARD_WIDTH = {
  lg: 270,
  sm: 182,
};
export const HERO_CARD_HEIGHT = {
  lg: 370,
  sm: 250,
};

export const HEADER_HEIGHT = {
  lg: 64,
  sm: 36,
};
