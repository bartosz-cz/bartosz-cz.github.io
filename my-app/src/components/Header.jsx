import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Header = ({ headerRef, setActiveProjects, activeProjects, setOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const helloRef = useRef(null);
  const devRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const updatePaths = () => {
      if (helloRef.current && devRef.current && btnRef.current) {
        const helloRect = helloRef.current.getBoundingClientRect();
        const devRect = devRef.current.getBoundingClientRect();
        const btnRect = btnRef.current.getBoundingClientRect();

        const helloStartX = helloRect.left - 40;
        const helloY = helloRect.top + helloRect.height / 2;
        const helloPathD = `M ${helloStartX} 0 L ${helloStartX} ${helloY} L ${
          helloRect.left - 5
        } ${helloY}`;
        setHelloPath(helloPathD);

        const startX = devRect.right;
        const startY = devRect.top + devRect.height / 2;
        const midX = startX + 100;
        const btnY = btnRect.top + btnRect.height / 2;
        const endX = btnRect.left + btnRect.width / 2;
        const btnPathD = `M ${startX - 12} ${startY + 20}  L ${
          startX - 12
        } ${btnY} L ${endX + 58} ${btnY}`;

        setBtnPath(btnPathD);
      }
    };

    updatePaths();

    window.addEventListener("resize", updatePaths);
    return () => window.removeEventListener("resize", updatePaths);
  }, []);

  const [helloPath, setHelloPath] = useState("");
  const [btnPath, setBtnPath] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (helloRef.current && devRef.current && btnRef.current) {
        const helloRect = helloRef.current.getBoundingClientRect();
        const devRect = devRef.current.getBoundingClientRect();
        const btnRect = btnRef.current.getBoundingClientRect();

        const helloStartX = helloRect.left - 40;
        const helloY = helloRect.top + helloRect.height / 2;
        const helloPathD = `M ${helloStartX} 0 L ${helloStartX} ${helloY} L ${
          helloRect.left - 5
        } ${helloY}`;
        setHelloPath(helloPathD);

        const startX = devRect.right;
        const startY = devRect.top + devRect.height / 2;
        const midX = startX + 100;
        const btnY = btnRect.top + btnRect.height / 2;
        const endX = btnRect.left + btnRect.width / 2;
        const btnPathD = `M ${startX - 12} ${startY + 20}  L ${
          startX - 12
        } ${btnY} L ${endX + 58} ${btnY}`;

        setTimeout(() => {
          setBtnPath(btnPathD);
          setTimeout(() => setBtnActive(true), 1100);
        }, 100);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleScrollToProjects = () => {
    if (!activeProjects) {
      setActiveProjects(true);
    } else {
      const scrollTargetY = window.innerHeight * 1;
      window.scrollTo({
        top: scrollTargetY,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (activeProjects) {
      const scrollTargetY = window.innerHeight * 1;
      window.scrollTo({
        top: scrollTargetY,
        behavior: "smooth",
      });
    }
  }, [activeProjects]);

  return (
    <Box
      component="section"
      ref={headerRef}
      sx={{
        width: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "top",
        backgroundColor: "background.default",
        px: isMobile ? 3 : 8,
        paddingTop: isMobile ? 8 : 16,

        position: "relative",
        color: "#fff",
      }}
    >
      {/* Animated line */}
      {
        <svg
          width="100%"
          height="80%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "visible",
            zIndex: 0,
          }}
        >
          {helloPath && !isMobile && (
            <path
              d={helloPath}
              stroke={
                theme.palette.primary.stroke || theme.palette.primary.main
              }
              strokeWidth="4"
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="0"
                dur="2s"
                fill="freeze"
                begin="0s"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0 0 0.58 1" // clear ease-out
              />
            </path>
          )}

          {btnPath && (
            <path
              d={btnPath}
              stroke={
                theme.palette.primary.stroke || theme.palette.primary.main
              }
              strokeWidth="4"
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="0"
                dur="2s"
                fill="freeze"
                begin="0.5s" // start exactly after first ends (2s)
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.42 0 0.58 1" // ease-in-out
              />
            </path>
          )}
        </svg>
      }

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(8px, 5vw, 160px)",
          width: "100%",
          maxWidth: 1200,
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            textAlign: isMobile ? "center" : "left",
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            gap: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 600 }} ref={helloRef}>
            Hello<span style={{ color: theme.palette.primary.stroke }}>.</span>
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 400, fontSize: isMobile ? "1.7rem" : "2.125rem" }}
          >
            I’m Bartosz
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, fontSize: isMobile ? "2.2rem" : "3rem" }}
            ref={devRef}
            noWrap
          >
            Fullstack Developer
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              sx={{
                color: "#fff",
                width: 120,
                borderColor: "#fff",
                "&:hover": {
                  borderColor: "primary.fill",
                  color: "primary.fill",
                  backgroundColor: "background.default",
                },
              }}
            >
              Contact
            </Button>
            <Button
              variant={btnActive ? "contained" : "outlined"}
              onClick={handleScrollToProjects}
              ref={btnRef}
              sx={{
                transition: "all 0.5s ease-in-out",
                color: btnActive ? "#000" : "#fff",
                width: 120,
                backgroundColor: btnActive
                  ? theme.palette.primary.fill
                  : "transparent",
                borderColor: theme.palette.primary.fill,
                "&:hover": {
                  backgroundColor: theme.palette.primary.stroke,
                },
              }}
            >
              Portfolio
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: isMobile ? 200 : 300,
              height: isMobile ? 200 : 300,
              borderRadius: "50%",
              background: "rgba(255, 60, 0, 0.1)",
            }}
          />
          <Box
            component="img"
            src="../assets/profile.jpg"
            alt="Bartosz"
            sx={{
              width: isMobile ? 200 : 300,
              height: isMobile ? 200 : 300,
              objectFit: "cover",
              borderRadius: "50%",
              zIndex: 1,
              position: "relative",
            }}
          />
        </Box>
      </Box>
      {/* Karty z umiejętnościami */}
    </Box>
  );
};

export default Header;
