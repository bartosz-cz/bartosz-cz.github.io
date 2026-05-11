import { Box, GlobalStyles } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import SkillWall from "./components/SkillWall";
import ContactDialog from "./components/EmailDialog";

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [skillWallWidth, setSkillWallWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const skillWallRef = useRef(null);
  const exploreBtnRef = useRef(null);

  useLayoutEffect(() => {
    if (!headerRef.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setHeaderHeight(entry.contentRect.height);
      }
    });

    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!skillWallRef.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setSkillWallWidth(entry.contentRect.width);
      }
    });

    observer.observe(skillWallRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="main"
      id="main-content"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "clip",
        bgcolor: "background.default",
      }}
    >
      <Box
        component="a"
        href="#projects-section"
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 30,
          px: 1.5,
          py: 1,
          borderRadius: 999,
          backgroundColor: "background.paper",
          color: "text.primary",
          border: "1px solid",
          borderColor: "surface.strongBorder",
          textDecoration: "none",
          transform: "translateY(-160%)",
          transition: "transform 0.2s ease",
          "&:focus-visible": {
            transform: "translateY(0)",
          },
        }}
      >
        Skip to selected work
      </Box>

      <GlobalStyles
        styles={(theme) => ({
          "*": {
            scrollbarWidth: "thin",
            scrollbarColor: `${theme.palette.primary.stroke} transparent`,
          },
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,140,66,0.38)",
            borderRadius: "999px",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(255,140,66,0.55)",
          },
          "*::-webkit-scrollbar-track": {
            background: "transparent",
          },
        })}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.12,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: -140,
          left: -140,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,140,66,0.14) 0%, rgba(255,140,66,0.04) 42%, transparent 72%)",
          filter: "blur(10px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 120,
          right: -160,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(132,215,211,0.12) 0%, rgba(132,215,211,0.03) 45%, transparent 74%)",
          filter: "blur(10px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 5, // Increased to sit above the timeline lines that bleed from the Projects section
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Header
            headerRef={headerRef}
            setOpen={setOpen}
            exploreBtnRef={exploreBtnRef}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <SkillWall
            headerHeight={headerHeight}
            skillWallRef={skillWallRef}
            skillWallWidth={skillWallWidth}
          />
        </Box>
      </Box>

      <Projects exploreBtnRef={exploreBtnRef} />
      <Footer setOpen={setOpen} />
      <ContactDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default App;
