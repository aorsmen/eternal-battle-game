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
export const BROWN_LIGHT = "#dc6f18";

export const VILLAIN_RED = "#a9332c";
export const VILLAIN_RED_DARK = "#62201a";
export const HERO_BLUE = "#1c8db9";
export const HERO_BLUE_DARK = "#154376";

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
