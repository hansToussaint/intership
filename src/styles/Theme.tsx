import "./global.css";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CommonColors {
    mainBgColor: string;
    secondTextColor: string;
    bgAccent: string;
  }
}

const brownPrimary = "#8B5E3B";
const beigeSecondary = "#D7B899";
const mainBgColor = "#F5EFE6";
const secondTextColor = "#5C4033";
const accentColor = "#A67B5B";
const dangerColor = "#B22222";

const theme = createTheme({
  palette: {
    common: {
      black: "#1B1B1B",
      white: "#FFFFFF",
      bgAccent: accentColor,
      mainBgColor,
      secondTextColor,
    },
    primary: {
      main: brownPrimary,
    },
    secondary: {
      main: beigeSecondary,
    },
    error: {
      main: dangerColor,
    },
    background: {
      default: mainBgColor,
      paper: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: "'Merriweather', serif",

    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "0.4px",
      color: secondTextColor,
    },

    h2: {
      fontSize: "2.2rem",
      fontWeight: 300,
      // color: accentColor,
    },

    h3: {
      fontWeight: 600,
      fontSize: "1.6rem",
      color: brownPrimary,
    },

    h4: {
      fontSize: "5.5rem",
      fontWeight: 200,
      letterSpacing: "0.4px",
      color: "white",
    },

    body1: {
      fontWeight: 400,
      fontSize: "1.4rem",
      color: "#3E2C26",
    },
  },
});

export default theme;
