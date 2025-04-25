// main.jsx or main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

/*const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#00e676",
      fill: "#ffd700",
      stroke: "#d4af37", // optional neon green for web3 vibes
    },
    secondary: {
      main: "#00b0ff",
    },
  },
});*/
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121F28",
      paper: "#16232C",
    },
    primary: {
      main: "#00e676",
      fill: "#B400FF" /*"#ffd700"*/,
      stroke: "#9A37D3" /*"#d4af37"*/, // optional neon green for web3 vibes
    },
    secondary: {
      main: "#00b0ff",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
