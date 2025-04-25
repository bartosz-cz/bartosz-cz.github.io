import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Decentralized Time-Locked Staking Service",
    description:
      "HashHold is a time-locked staking smart contract for the Hedera network, supporting both native and custom fungible tokens. It calculates rewards based on staking duration and USD value, using real-time price feeds and decentralized swaps. Early withdrawals are penalized, with penalties redistributed to active stakers.",
    links: [
      {
        label: "Code",
        href: "https://github.com/bartosz-cz/hashhold",
        type: "outlined",
      },
    ],
    images: ["../assets/h1.png", "../assets/h2.png", "../assets/h3.png"],
  },
  {
    title: "Decentralized Exchange",
    description:
      "Project contains frontend preview of the application and on chain logic designed for the Ethereum blockchain. Live demo demonstrates the interactive features of the application, but for safety reasons on chain logic is not connected.",
    images: [
      "../assets/wholeView.png",
      "../assets/tokenSelect.png",
      "../assets/walletSelect3.png",
      "../assets/walletSeleect2.png",
    ],
    links: [
      {
        label: "Code",
        href: "https://github.com/bartosz-cz/CryptoExchange-DApp",
        type: "outlined",
      },

      {
        label: "Live Demo",
        href: "https://bartosz-cz.github.io/CryptoExchange-DApp/",
        type: "contained",
      },
    ],
  },
  {
    title: "Data Visualization Tool",
    description:
      "This application is designed to display a variety of data through interactive charts with extensive customization options. It's ideal for real-time data monitoring and analysis across numerous parameters such as voltage, temperature, humidity, and more.",
    images: [
      "../assets/View1.png",
      "../assets/View2.png",
      "../assets/View4.png",
      "../assets/View6.png",
    ],
    links: [
      {
        label: "Code",
        href: "https://github.com/bartosz-cz/Data_Visualization_Tool",
        type: "outlined",
      },
    ],
  },
];

const Projects = ({ headerlHeight }) => {
  const [positions, setPositions] = useState({
    leftX: 100,
    rightX: 700,
    width: 800,
  });
  const containerRef = useRef(null);
  const theme = useTheme();
  // Refs to each path segment
  const segmentRefs = useRef([]);
  // Which segments are already animated
  const animatedSegments = useRef([]);
  // Number of segments fully done => controls which dot/project is visible
  const [visibleStep, setVisibleStep] = useState(0);
  const [cardWidth, setCardWidth] = useState(positions.width);
  // Layout
  const [dotSpacing, setDotSpacing] = useState(650);
  const [bottomLineOffset, setBottomLineOffset] = useState(0);
  const fraction = 0.7;
  const radius = 16;
  const topLineOffset = -200;

  const cardOffset = 30;

  // Update dotSpacing on resize
  useLayoutEffect(() => {
    const updateSpacing = () => {
      const screenHeight = window.innerHeight;
      const offset = -150;
      const min = 400;
      const max = 800;

      const calculated = screenHeight + offset;
      const clamped = Math.max(min, Math.min(max, calculated));
      setDotSpacing(clamped);
      setBottomLineOffset(clamped);
    };

    updateSpacing();
  }, []);

  // Set container positions on mount + resize
  useLayoutEffect(() => {
    const updateWidth = () => {
      console.log("cont " + containerRef.current?.offsetWidth);
      const width = containerRef.current?.offsetWidth || 800;
      const width_ = width - positions.leftX;
      console.log("eeeeeeeeeeeeeeeeeeeeeee " + width_);
      setCardWidth(width_);
      setPositions({
        width,
        leftX: Math.min(width * 0.15, 30),
        rightX: Math.max(width * 0.85, width - 30),
      });
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { leftX, rightX } = positions;

  // Real dots => one per project
  const realDots = useMemo(() => {
    return projects.map((_, i) => ({
      cx: i % 2 === 0 ? leftX : rightX,
      cy: 100 + i * dotSpacing,
    }));
  }, [leftX, rightX, dotSpacing]);

  // Extended dots => [ pseudoTop, ...realDots, pseudoBottom ]
  const extendedDots = useMemo(() => {
    if (!realDots.length) return [];
    const pseudoTop = {
      cx: realDots[0].cx,
      cy: realDots[0].cy + topLineOffset,
    };
    const pseudoBottom = {
      cx: realDots[realDots.length - 1].cx,
      cy: realDots[realDots.length - 1].cy + bottomLineOffset,
    };
    return [pseudoTop, ...realDots, pseudoBottom];
  }, [realDots]);

  // Build path segments
  const paths = useMemo(() => {
    const arr = [];
    for (let i = 0; i < extendedDots.length - 1; i++) {
      const dot = extendedDots[i];
      const next = extendedDots[i + 1];
      const startX = dot.cx;
      const startY = dot.cy;
      const endX = next.cx;
      const endY = next.cy;

      // Example corner: fraction-based or a direct offset
      const totalDistY = endY - startY;
      const cornerY = startY + totalDistY - 68;

      const d = `
          M ${startX} ${startY}
          L ${startX} ${cornerY}
          L ${endX} ${cornerY}
          L ${endX} ${endY}
        `;
      arr.push(d);
    }
    return arr;
  }, [extendedDots, leftX, rightX, dotSpacing]);

  // Animate a segment
  const animateSegment = (i) => {
    if (i >= paths.length) return;
    if (animatedSegments.current[i]) return; // already done?

    const pathEl = segmentRefs.current[i];
    if (!pathEl) return;

    console.log("Segment " + i + " animating...");
    animatedSegments.current[i] = true; // mark as started to avoid duplicates

    const length = pathEl.getTotalLength();
    pathEl.style.opacity = "0";
    pathEl.style.strokeDasharray = length;
    pathEl.style.strokeDashoffset = length;
    pathEl.style.transition = "none";
    pathEl.getBoundingClientRect(); // force reflow

    pathEl.style.transition = "opacity 0.01s, stroke-dashoffset 1s ease-in-out";
    pathEl.style.opacity = "1";

    requestAnimationFrame(() => {
      pathEl.style.strokeDashoffset = "0";
    });

    // After 1s -> segment done
    setTimeout(() => {
      console.log("Segment " + i + " done.");
      setVisibleStep((prev) => prev + 1);
      console.log("setVisible " + visibleStep + i);
    }, 1000);
  };

  // Observe each segment with IntersectionObserver
  useEffect(() => {
    const observers = [];

    segmentRefs.current.forEach((pathEl, i) => {
      if (!pathEl) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            !animatedSegments.current[i] &&
            i === visibleStep
          ) {
            animateSegment(i);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.49 }
      );

      observer.observe(pathEl);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [paths, visibleStep]);

  const containerHeight = extendedDots.length
    ? extendedDots[extendedDots.length - 1].cy
    : 1000;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        height: containerHeight,
        py: 10,
        px: 2,
        backgroundColor: "background.default",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <svg
          width={positions.width}
          height={containerHeight}
          viewBox={`0 0 ${positions.width} ${containerHeight}`}
          preserveAspectRatio="xMinYMin slice"
        >
          {paths.map((d, i) => (
            <path
              key={i}
              ref={(el) => (segmentRefs.current[i] = el)}
              d={d}
              stroke={theme.palette.primary.stroke}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: animatedSegments.current[i] ? 1 : 0,
              }}
            />
          ))}

          {/* realDots => show dot i if segment i is done */}
          {realDots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={radius}
              fill={theme.palette.primary.fill}
              stroke={theme.palette.background.default}
              strokeWidth="4"
              style={{
                opacity: visibleStep > i ? 1 : 0,
                transition: "opacity 0.5s ease-in",
              }}
            />
          ))}
        </svg>
      </Box>

      {/* Project Cards */}
      {projects.map((project, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: realDots[i]?.cy - 40,

            left:
              i % 2 === 0
                ? realDots[i]?.cx + 30
                : realDots[i]?.cx - 30 - cardWidth,
            width: cardWidth,
            opacity: visibleStep > i ? 1 : 0,
            transform: visibleStep > i ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease-out",
            zIndex: 2,
          }}
        >
          <ProjectCard
            title={project.title}
            description={project.description}
            images={project.images}
            links={project.links}
            align={i % 2 === 0 ? "left" : "right"}
            fillHeight={dotSpacing - 60}
            fillWidth={cardWidth}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Projects;
