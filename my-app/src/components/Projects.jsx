import { useEffect, useRef, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Polska Głosuje",
    category: "Civic tech platform",
    status: "Product in development",
    year: "2025",
    lead: "A Polish civic tech platform that brings petitions and local initiatives into one clear, accessible digital experience.",

    problem:
      "Civic initiatives are often scattered across outdated platforms, social media, and independent websites. For many users, creating or supporting a petition still feels too formal, fragmented, and difficult to navigate.",

    solution:
      "Polska Głosuje simplifies the process with guided petition creation, local discovery, ready to use documents, sharing tools, and AI assisted support for writing and structuring initiatives.",

    role: "Sole technical person responsible for product architecture, UX flows, frontend implementation, backend workflows, document generation, and the technical foundation of the platform.",

    highlights: [
      "Centralizes petition creation, discovery, support, and visibility in one product",
      "Guides users from an idea to a structured civic initiative",
      "Supports local discovery through listings, topics, and map based exploration",
      "Includes document generation and recipient focused workflows",
      "Uses AI for writing support, structure suggestions, and process guidance",
    ],

    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Product UX",
      "Maps",
      "AI workflows",
    ],

    links: [
      {
        label: "Website",
        href: "https://polskaglosuje.pl",
        type: "contained",
      },
    ],

    galleryLabel: "Product snapshots",

    images: [
      {
        src: "/assets/pg4.png",
        alt: "Polska Głosuje landing page with hero section and how it works cards",
        caption:
          "Landing page introducing the petition flow with a simple three step explanation.",
      },
      {
        src: "/assets/pg1.png",
        alt: "Dark mode petition discovery screen with Poland map and regional filters",
        caption:
          "Map based discovery view for browsing petitions by region, scope, and popularity.",
      },
      {
        src: "/assets/pg2.png",
        alt: "Light mode local petition listing with selected municipality on the map",
        caption:
          "Local discovery experience showing petitions filtered down to a selected municipality.",
      },
      {
        src: "/assets/pg3.png",
        alt: "Petition detail page with support modal and verification options",
        caption:
          "Support flow with multiple verification levels, from email to stronger identity based confirmation.",
      },
    ],
  },
  {
    title: "HashHold",
    category: "Web3 staking product",
    status: "Online DApp",
    year: "2024",
    lead: "A Hedera based staking DApp for locking HBAR and HTS tokens, managing active holds, and turning protocol mechanics into a clear product experience.",

    problem:
      "Staking products often hide complex logic behind unclear interfaces. Users need to understand token value, lock duration, rewards, penalties, and wallet state before making a commitment.",

    solution:
      "HashHold combines a Solidity staking protocol with a full DApp interface. It supports time locked holds, epoch based rewards, token valuation through external pricing, early withdrawal penalties, and wallet connected interaction flows.",

    role: "Designed and implemented the DApp experience and the underlying smart contract logic, including staking mechanics, reward accounting, token handling, wallet flows, confirmation states, and protocol oriented UI.",

    highlights: [
      "Full DApp experience with wallet connection, holding flow, active positions, and confirmation states",
      "Supports native HBAR and HTS token staking on Hedera",
      "Uses stake value and lock duration to calculate reward shares",
      "Integrates pricing and swap quoting concepts through Pyth and SaucerSwap",
      "Redistributes early withdrawal penalties into epoch based rewards",
    ],

    stack: [
      "React",
      "Solidity",
      "Hedera",
      "HTS",
      "HBAR",
      "Pyth",
      "SaucerSwap",
      "Web3 UX",
    ],

    links: [
      {
        label: "DApp",
        href: "https://bartosz-cz.github.io/hashhold-dapp/",
        type: "contained",
      },
      {
        label: "Code",
        href: "https://github.com/bartosz-cz/hashhold",
        type: "outlined",
      },
    ],

    galleryLabel: "DApp snapshots",

    images: [
      {
        src: "/assets/h1.png",
        alt: "HashHold holding dashboard with active staking positions",
        caption:
          "Main DApp screen with token holding controls, connected wallet state, and active staking positions.",
      },
      {
        src: "/assets/h2.png",
        alt: "HashHold landing page explaining staking access and boosted earnings",
        caption:
          "Landing section explaining the product idea before the user enters the staking flow.",
      },
      {
        src: "/assets/h3.png",
        alt: "HashHold hold confirmation modal with token amount and penalty information",
        caption:
          "Confirmation flow showing token amount, lock end time, and early withdrawal penalty context.",
      },
    ],
  },
  {
    title: "Decentralized Exchange Preview",
    category: "Web3 trading interface",
    status: "Frontend preview",
    year: "2023",
    lead: "A React based cryptocurrency exchange interface exploring wallet connection, token selection, live market views, and swap interaction flows.",
    problem:
      "DEX interfaces often make users reason about wallet state, token selection, transaction intent, and market context at the same time, which can make trading flows feel unclear.",
    solution:
      "The project focuses on a realistic frontend preview of an exchange experience, separating interaction design from live execution while still modelling the core swap flow.",
    role: "Designed and implemented the frontend experience, wallet selection flow, token interaction patterns, chart views, and swap oriented UI states.",
    highlights: [
      "Includes wallet detection and connection states for common browser wallets",
      "Explores token selection, swap lists, market charts, and confirmation flows",
      "Keeps the demo safe while preserving the structure of a realistic trading interface",
    ],
    stack: [
      "React",
      "Ethereum",
      "Web3 UX",
      "Wallets",
      "Charts",
      "Interface systems",
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://bartosz-cz.github.io/CryptoExchange-DApp/",
        type: "contained",
      },
      {
        label: "Code",
        href: "https://github.com/bartosz-cz/CryptoExchange-DApp",
        type: "outlined",
      },
    ],
    galleryLabel: "Trading flow",
    images: [
      {
        src: "/assets/wholeView.png",
        alt: "DEX main trading layout",
        caption:
          "Main exchange layout combining market context, swap intent, and token flow.",
      },
      {
        src: "/assets/tokenSelect.png",
        alt: "DEX token selection modal",
        caption:
          "Token selection modal designed to make asset switching faster and clearer.",
      },
      {
        src: "/assets/walletSelect3.png",
        alt: "DEX wallet connection step",
        caption:
          "Wallet connection state focused on simple onboarding and clear user choice.",
      },
      {
        src: "/assets/walletSeleect2.png",
        alt: "DEX wallet selection alternate state",
        caption:
          "Alternate wallet selection screen maintaining continuity in the trading flow.",
      },
    ],
  },
  {
    title: "Data Visualization Tool",
    category: "Monitoring dashboard",
    status: "Engineering tool",
    year: "2022",
    lead: "A React dashboard for interactive monitoring and analysis of many live style parameters such as voltage, current, pressure, temperature, and humidity.",
    problem:
      "Dense operational data is hard to read when many metrics need to be monitored, compared, customized, and inspected over time.",
    solution:
      "The application organizes metrics into configurable chart panels with layout controls, zooming, history settings, fullscreen views, and customizable chart behavior.",
    role: "Implemented the frontend dashboard and visualization UX, focusing on readable information density, chart interaction, and practical monitoring workflows.",
    highlights: [
      "Supports multi metric dashboards with grouped data views",
      "Includes chart customization, zooming, fullscreen analysis, and layout controls",
      "Designed for monitoring scenarios where dense information must remain readable",
    ],
    stack: [
      "React",
      "Charts",
      "Dashboard UX",
      "Data visualization",
      "Monitoring",
      "UI state",
    ],
    links: [
      {
        label: "Code",
        href: "https://github.com/bartosz-cz/Data_Visualization_Tool",
        type: "outlined",
      },
    ],
    galleryLabel: "Dashboard states",
    images: [
      {
        src: "/assets/View1.png",
        alt: "Dark mode grouped monitoring dashboard with six metric cards",
        caption:
          "Grouped dashboard view showing key live metrics with quick access to settings, fullscreen mode, and chart views.",
      },
      {
        src: "/assets/View2.png",
        alt: "Dense dark mode monitoring dashboard showing all metric groups",
        caption:
          "All-groups overview designed for scanning many parameters at once without switching between tabs.",
      },
      {
        src: "/assets/View4.png",
        alt: "Light mode dashboard with metric cards and embedded chart panels",
        caption:
          "Mixed layout combining compact metric cards with expanded charts for closer signal inspection.",
      },
      {
        src: "/assets/View6.png",
        alt: "Expanded humidity chart view with multiple plotted signals and chart controls",
        caption:
          "Detailed chart view with multiple data series, selectable signals, density controls, and chart point settings.",
      },
    ],
  },
];

const buildSteppedPathSegments = (points, isMobile) => {
  if (points.length < 2) return [];

  const cornerRadius = 28;
  const segments = [];

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const directionX = current.x > previous.x ? 1 : -1;

    // For the very first segment coming from the Header button,
    // we want a specific "horizontal-first then vertical" turn.
    const isFirstSegment = previous.isHeader;

    const minimumTurnY = isFirstSegment
      ? previous.y // Turn immediately at button height
      : Math.max(previous.y + 220, (previous.bottom ?? previous.y) + 72);

    const latestSafeTurnY = current.y - 98;
    const midY = isFirstSegment
      ? previous.y // Turn at the top
      : Math.max(previous.y + 120, Math.min(latestSafeTurnY, minimumTurnY));

    const verticalRadius = Math.min(
      cornerRadius,
      Math.abs(current.y - previous.y) / 4,
    );
    const horizontalRadius = Math.min(
      cornerRadius,
      Math.abs(current.x - previous.x) / 4,
    );

    const commands = isFirstSegment
      ? [
          `M ${previous.x} ${previous.y}`,
          `L ${current.x + (current.x > previous.x ? -horizontalRadius : horizontalRadius)} ${previous.y}`,
          `Q ${current.x} ${previous.y} ${current.x} ${previous.y + verticalRadius}`,
          `L ${current.x} ${current.y}`,
        ]
      : [
          `M ${previous.x} ${previous.y}`,
          `L ${previous.x} ${midY - verticalRadius}`,
          `Q ${previous.x} ${midY} ${previous.x + directionX * horizontalRadius} ${midY}`,
          `L ${current.x - directionX * horizontalRadius} ${midY}`,
          `Q ${current.x} ${midY} ${current.x} ${midY + verticalRadius}`,
          `L ${current.x} ${current.y}`,
        ];
    segments.push(commands.join(" "));
  }

  return segments;
};

const Projects = ({ exploreBtnRef }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const stepRefs = useRef([]);
  const timelineRef = useRef(null);
  const dotRefs = useRef([]);
  const [visibleStep, setVisibleStep] = useState(1);
  const [timelinePathSegments, setTimelinePathSegments] = useState([]);
  const [timelineSize, setTimelineSize] = useState({ width: 0, height: 0 });
  const [lineStarted, setLineStarted] = useState(false);
  const [segmentProgresses, setSegmentProgresses] = useState([]);

  useEffect(() => {
    let frameId;
    const handleScroll = () => {
      if (frameId) window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight * 0.6; // Lowered to feel more responsive on retraction

        const progresses = [];



        // 2. Calculate progress between projects
        for (let i = 0; i < projects.length; i++) {
          const dotStart = dotRefs.current[i];
          const dotEnd = dotRefs.current[i + 1];

          if (!dotStart || !dotEnd) {
            progresses.push(0);
            continue;
          }

          const rectStart = dotStart.getBoundingClientRect();
          const rectEnd = dotEnd.getBoundingClientRect();

          const startY = rectStart.top + rectStart.height / 2;
          const endY = rectEnd.top + rectEnd.height / 2;

          if (startY > triggerPoint) {
            progresses.push(0);
          } else if (endY < triggerPoint) {
            progresses.push(1);
          } else {
            const progress = (triggerPoint - startY) / (endY - startY);
            progresses.push(
              Math.round(Math.max(0, Math.min(1, progress)) * 1000) / 1000,
            );
          }
        }
        setSegmentProgresses(progresses);

        const currentVisible = dotRefs.current.reduce((acc, dot, i) => {
          if (!dot) return acc;
          const rect = dot.getBoundingClientRect();
          return rect.top + rect.height / 2 < triggerPoint ? i + 1 : acc;
        }, 1);
        setVisibleStep(currentVisible);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [isMobile]);

  useEffect(() => {
    let frameId;
    let settleTimeoutId;
    const timelineElement = timelineRef.current;

    const updateTimeline = () => {
      if (!timelineElement) return;

      const containerRect = timelineElement.getBoundingClientRect();
      const points = [];

      // 1. Explicitly collect all projects + the ghost point
      for (let i = 0; i <= projects.length; i++) {
        const dot = dotRefs.current[i];
        if (!dot) continue;

        const dotRect = dot.getBoundingClientRect();
        const stepRect = stepRefs.current[i]?.getBoundingClientRect();

        points.push({
          x: dotRect.left - containerRect.left + dotRect.width / 2,
          y: dotRect.top - containerRect.top + dotRect.height / 2,
          bottom: stepRect ? stepRect.bottom - containerRect.top : undefined,
        });
      }

      setTimelineSize({
        width: containerRect.width,
        height: containerRect.height + 600, // Manually extend SVG height to draw into footer area
      });
      setTimelinePathSegments(buildSteppedPathSegments(points, isMobile));
    };

    const scheduleTimelineUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateTimeline);
    };

    scheduleTimelineUpdate();
    settleTimeoutId = window.setTimeout(scheduleTimelineUpdate, 480);
    window.addEventListener("resize", scheduleTimelineUpdate);

    const resizeObserver = new ResizeObserver(scheduleTimelineUpdate);
    resizeObserver.observe(timelineElement);
    stepRefs.current.forEach((element) => {
      if (element) resizeObserver.observe(element);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(settleTimeoutId);
      window.removeEventListener("resize", scheduleTimelineUpdate);
      resizeObserver.disconnect();
    };
  }, [isMobile, visibleStep, projects.length]);

  const getStepState = (index) => {
    if (visibleStep > index + 1) return "visited";
    if (visibleStep > index) return "current";
    return "upcoming";
  };

  return (
    <Box
      component="section"
      id="projects-section"
      tabIndex={-1}
      aria-labelledby="projects-heading"
      sx={{
        position: "relative",
        py: { xs: 8, md: 10 },
        px: { xs: 0, md: 0 }, // Reduced horizontal padding to screen edges
        background:
          "linear-gradient(180deg, rgba(9,20,25,0.15) 0%, rgba(9,20,25,0.42) 22%, rgba(9,20,25,0.78) 100%)",
        overflow: "visible",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 18% 14%, rgba(255,140,66,0.1), transparent 22%), radial-gradient(circle at 82% 22%, rgba(132,215,211,0.08), transparent 18%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1560,
          mx: "auto",
          minWidth: 0,
          px: { xs: 2, md: 4 }, // Added some internal padding so content doesn't touch the glass edge
        }}
      >
        <Box
          sx={{
            maxWidth: 820,
            mx: "auto",
            textAlign: "center",
            mb: { xs: 8, md: 10 },
            minWidth: 0,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "secondary.main",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              mb: 1.2,
              fontSize: "0.72rem",
              fontWeight: 700,
            }}
          >
            Selected Work
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            id="projects-heading"
            sx={{
              color: "text.primary",
              fontWeight: 500,
              textWrap: "balance",
              opacity: 0.92,
              letterSpacing: "-0.01em",
            }}
          >
            Projects where product thinking, full stack engineering, and complex
            logic meet.
          </Typography>
        </Box>

        <Box ref={timelineRef} sx={{ position: "relative" }}>
          {timelinePathSegments.length > 0 && (
            <Box
              component="svg"
              width={timelineSize.width}
              height={timelineSize.height}
              viewBox={`0 0 ${timelineSize.width} ${timelineSize.height}`}
              aria-hidden="true"
              sx={{
                position: "absolute",
                inset: 0,
                overflow: "visible",
                pointerEvents: "none",
                zIndex: 0,
                contain: "paint",
                transform: "translateZ(0)",
              }}
            >
              <defs>
                <linearGradient
                  id="projectTimelineGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={timelineSize.height}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="rgba(255,140,66,0.98)" />
                  <stop offset="48%" stopColor="rgba(244,183,106,0.78)" />
                  <stop offset="100%" stopColor="rgba(132,215,211,0.52)" />
                </linearGradient>
              </defs>
              {timelinePathSegments.map((d, i) => (
                <g key={i}>
                  <path
                    d={d}
                    fill="none"
                    stroke="rgba(255,140,66,0.16)"
                    strokeWidth="12"
                    strokeLinecap="butt"
                    strokeLinejoin="round"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={1 - (segmentProgresses[i] || 0)}
                    style={{
                      transition: "stroke-dashoffset 0.1s linear",
                      willChange: "stroke-dashoffset",
                      shapeRendering: "geometricPrecision",
                    }}
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke="url(#projectTimelineGradient)"
                    strokeWidth="6"
                    strokeLinecap="butt"
                    strokeLinejoin="round"
                    filter="drop-shadow(0 0 12px rgba(255,140,66,0.24))"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={1 - (segmentProgresses[i] || 0)}
                    style={{
                      transition: "stroke-dashoffset 0.1s linear",
                      willChange: "stroke-dashoffset",
                      shapeRendering: "geometricPrecision",
                    }}
                  />
                </g>
              ))}
            </Box>
          )}
          {projects.map((project, index) => {
            const state = getStepState(index);
            const alignLeft = isMobile || index % 2 === 0;
            const dotFill =
              state === "visited"
                ? theme.palette.primary.fill
                : state === "current"
                  ? theme.palette.secondary.main
                  : "rgba(7, 17, 22, 0.92)";
            const dotText =
              state === "current"
                ? "#092126"
                : state === "visited"
                  ? "#1f1508"
                  : "#fff7ea";

            return (
              <Box
                key={project.title}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: isMobile
                    ? "row"
                    : alignLeft
                      ? "row"
                      : "row-reverse",
                  justifyContent: alignLeft ? "flex-start" : "flex-end",
                  alignItems: "stretch",
                  gap: { xs: 0, md: 2.5 },
                  mb: { xs: 5, md: 13 },
                  opacity: state === "upcoming" ? 0.64 : 1,
                  transition: "opacity 0.45s ease",
                  minWidth: 0,
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    width: isMobile ? 58 : 70,
                    flex: "0 0 auto",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    minHeight: "100%",
                    pt: 1.5,
                  }}
                >
                  <Box
                    ref={(element) => {
                      dotRefs.current[index] = element;
                    }}
                    sx={{
                      position: "relative",
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: dotFill,
                      border: `7px solid ${theme.palette.background.default}`,
                      boxShadow:
                        state === "current"
                          ? "0 0 0 10px rgba(132,215,211,0.08), 0 10px 20px rgba(0,0,0,0.28)"
                          : "0 8px 18px rgba(0,0,0,0.24)",
                      color: dotText,
                      fontFamily: theme.typography.button.fontFamily,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      zIndex: 2,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: isMobile ? "calc(100% - 58px)" : "calc(100% - 92px)",
                    maxWidth: { md: 1320, xl: 1440 },
                    minWidth: 0,
                    position: "relative",
                    zIndex: 3,
                  }}
                >
                  <ProjectCard
                    {...project}
                    projectIndex={index}
                    stepLabel={`Step ${String(index + 1).padStart(2, "0")}`}
                    timelineState={state}
                    progress={segmentProgresses[index] || 0}
                    year={project.year}
                    fillWidth="100%"
                  />
                </Box>
              </Box>
            );
          })}
          {/* Small invisible anchor at the bottom of projects section */}
          <Box
            sx={{
              height: 40, // Minimal height to avoid gap
              width: "100%",
              position: "relative",
              pointerEvents: "none",
            }}
          >
            <Box
              ref={(el) => (dotRefs.current[projects.length] = el)}
              sx={{
                position: "absolute",
                top: 380, // Adjusted to reach the 'Final Stop' card in the footer while keeping gap minimal
                left: "50%",
                transform: "translateX(-50%)",
                width: 1,
                height: 1,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
