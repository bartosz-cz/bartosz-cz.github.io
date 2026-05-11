import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#071116",
      paper: "#0f1b21",
    },
    primary: {
      main: "#f4b76a",
      fill: "#f4b76a",
      stroke: "#ff8c42",
    },
    secondary: {
      main: "#84d7d3",
    },
    text: {
      primary: "#f6f2e9",
      secondary: "#9db1b4",
    },
    divider: "rgba(244, 183, 106, 0.14)",
    surface: {
      muted: "#122229",
      elevated: "rgba(15, 27, 33, 0.8)",
      border: "rgba(244, 183, 106, 0.16)",
      strongBorder: "rgba(132, 215, 211, 0.28)",
      glow: "rgba(255, 140, 66, 0.24)",
      heroGlow: "rgba(132, 215, 211, 0.16)",
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      fontSize: "clamp(2.8rem, 6.8vw, 5.15rem)",
      fontWeight: 700,
      letterSpacing: "-0.05em",
      lineHeight: 0.98,
    },
    h2: {
      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
      fontWeight: 700,
      letterSpacing: "-0.045em",
      lineHeight: 0.98,
    },
    h3: {
      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      fontSize: "clamp(1.55rem, 2.5vw, 2rem)",
      fontWeight: 600,
      letterSpacing: "-0.035em",
    },
    h4: {
      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      fontSize: "clamp(1.05rem, 1.7vw, 1.3rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)",
      fontWeight: 600,
      letterSpacing: "-0.025em",
    },
    body1: {
      fontSize: "0.98rem",
      lineHeight: 1.75,
    },
    body2: {
      fontSize: "0.88rem",
      lineHeight: 1.65,
    },
    button: {
      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          backgroundColor: "#071116",
        },
        ":root": {
          colorScheme: "dark",
        },
        body: {
          minWidth: 320,
          background:
            "radial-gradient(circle at top left, rgba(255, 140, 66, 0.12), transparent 28%), radial-gradient(circle at 82% 18%, rgba(132, 215, 211, 0.12), transparent 24%), linear-gradient(180deg, #071116 0%, #08161c 52%, #071116 100%)",
          color: "#f6f2e9",
        },
        "a, button, [role='button'], input, textarea, [tabindex]:not([tabindex='-1'])":
          {
            outline: "none",
          },
        "a:focus-visible, button:focus-visible, [role='button']:focus-visible, input:focus-visible, textarea:focus-visible, [tabindex]:not([tabindex='-1']):focus-visible":
          {
            outline: "3px solid rgba(244, 183, 106, 0.85)",
            outlineOffset: "3px",
            boxShadow: "0 0 0 6px rgba(132, 215, 211, 0.18)",
          },
        "::selection": {
          backgroundColor: "rgba(244, 183, 106, 0.32)",
          color: "#fff8ef",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(15, 27, 33, 0.78)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(244, 183, 106, 0.12)",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.28)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 999,
          paddingInline: "1.1rem",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
