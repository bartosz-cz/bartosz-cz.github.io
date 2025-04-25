import { Box } from "@mui/material";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SkillWall from "./components/SkillWall";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { GlobalStyles } from "@mui/material";
import ContactDialog from "./components/EmailDialog";

function App() {
  const [headerlHeight, setHeaderlHeight] = useState(0);
  const [skillWallWidth, setSkillWallWidth] = useState(0);
  const [activeProjects, setActiveProjects] = useState(false);
  const headerRef = useRef(null);
  const skillWallRef = useRef(null);
  const [open, setOpen] = useState(false);
  useLayoutEffect(() => {
    console.log(headerRef);
    if (!headerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        console.log(entry.contentRect.height);
        setHeaderlHeight(entry.contentRect.height);
      }
    });

    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useLayoutEffect(() => {
    console.log(skillWallRef);
    if (!skillWallRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSkillWallWidth(entry.contentRect.width);
      }
    });

    observer.observe(skillWallRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <Box
      sx={{ width: "100%", minHeight: "100svh", bgcolor: "background.default" }}
    >
      <GlobalStyles
        styles={{
          "*": {
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(100,100,100,0.3) transparent",
          },
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(100,100,100,0.3)",
            borderRadius: "4px",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(100,100,100,0.5)",
          },
          "*::-webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
      />
      <Box
        sx={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          {" "}
          <Header
            headerRef={headerRef}
            setActiveProjects={setActiveProjects}
            activeProjects={activeProjects}
            setOpen={setOpen}
          />
        </Box>{" "}
        {/* PUSTA PRZESTRZEŃ */}
        <Box sx={{ flexGrow: 1 }} /> {/* PUSTA PRZESTRZEŃ */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {" "}
          <SkillWall
            headerlHeight={headerlHeight}
            skillWallRef={skillWallRef}
            skillWallWidth={skillWallWidth}
          ></SkillWall>
        </Box>{" "}
        {/* PUSTA PRZESTRZEŃ */}
      </Box>
      {activeProjects && <Projects headerlHeight={headerlHeight}></Projects>}
      {activeProjects && (
        <Footer headerlHeight={headerlHeight} setOpen={setOpen}></Footer>
      )}
      <ContactDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default App;
