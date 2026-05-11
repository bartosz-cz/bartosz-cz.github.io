import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/Shield";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";

const focusAreas = [
  "React & TypeScript",
  "Backend Architecture",
  "Smart Contracts",
];

const buildLinePaths = ({
  topPillEl,
  secondaryBtnEl,
  primaryBtnEl,
  textContentEl,
  headerEl,
  isMobile,
}) => {
  if (
    !topPillEl ||
    !secondaryBtnEl ||
    !primaryBtnEl ||
    !textContentEl ||
    !headerEl ||
    isMobile
  ) {
    return null;
  }

  const headerRect = headerEl.getBoundingClientRect();
  const pillRect = topPillEl.getBoundingClientRect();
  const secondaryRect = secondaryBtnEl.getBoundingClientRect();
  const primaryRect = primaryBtnEl.getBoundingClientRect();
  const textRect = textContentEl.getBoundingClientRect();
  const radius = 24;

  const getRelative = (rect) => ({
    left: rect.left - headerRect.left,
    right: rect.right - headerRect.left,
    top: rect.top - headerRect.top,
    bottom: rect.bottom - headerRect.top,
    width: rect.width,
    height: rect.height,
    centerX: rect.left - headerRect.left + rect.width / 2,
    centerY: rect.top - headerRect.top + rect.height / 2,
  });

  const pill = getRelative(pillRect);
  const secondary = getRelative(secondaryRect);
  const primary = getRelative(primaryRect);
  const text = getRelative(textRect);

  // Path 1: From top to left of pill
  const startX = pill.left - 48;
  const pillY = pill.centerY;

  const path1 = [
    `M ${startX} 0`,
    `L ${startX} ${pillY - radius}`,
    `Q ${startX} ${pillY} ${startX + radius} ${pillY}`,
    `L ${pill.left - 4} ${pillY}`,
  ].join(" ");

  // Path 2: From right of pill to right of button
  const exitX = Math.max(text.right + 64, secondary.right + 64);
  const btnY = secondary.centerY;

  const path2 = [
    `M ${pill.right + 4} ${pillY}`,
    `L ${exitX - radius} ${pillY}`,
    `Q ${exitX} ${pillY} ${exitX} ${pillY + radius}`,
    `L ${exitX} ${btnY - radius}`,
    `Q ${exitX} ${btnY} ${exitX - radius} ${btnY}`,
    `L ${secondary.right - 10} ${btnY}`,
  ].join(" ");

  // Path 3: From Start Conversation to Explore Projects
  const path3 = [
    `M ${secondary.left + 10} ${secondary.centerY}`,
    `L ${primary.right - 6} ${primary.centerY}`,
  ].join(" ");

  return [path1, path2, path3];
};

const Header = ({ headerRef, setOpen, exploreBtnRef }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const helloRef = useRef(null);
  const topPillRef = useRef(null);
  const textContentRef = useRef(null);
  const ctaRef = useRef(null);
  const conversationBtnRef = useRef(null);
  const [headerPaths, setHeaderPaths] = useState([]);
  const [btnActive, setBtnActive] = useState(false);

  useEffect(() => {
    const updatePaths = () => {
      const paths = buildLinePaths({
        topPillEl: topPillRef.current,
        textContentEl: textContentRef.current,
        secondaryBtnEl: conversationBtnRef.current,
        primaryBtnEl: exploreBtnRef?.current,
        headerEl: headerRef?.current,
        isMobile,
      });
      setHeaderPaths(paths || []);
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);
    return () => window.removeEventListener("resize", updatePaths);
  }, [isMobile]);

  useEffect(() => {
    let buttonPathTimeoutId;
    let buttonStateTimeoutId;

    const timeoutId = window.setTimeout(() => {
      const paths = buildLinePaths({
        topPillEl: topPillRef.current,
        textContentEl: textContentRef.current,
        secondaryBtnEl: conversationBtnRef.current,
        primaryBtnEl: exploreBtnRef?.current,
        headerEl: headerRef?.current,
        isMobile,
      });

      setHeaderPaths(paths || []);
      // Button lights up after the full sequence (approx 2.8s)
      buttonStateTimeoutId = window.setTimeout(() => setBtnActive(true), 2000);
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(buttonPathTimeoutId);
      window.clearTimeout(buttonStateTimeoutId);
    };
  }, [isMobile]);

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects-section");
    if (element) {
      const yOffset = 80; // Added offset to scroll a bit lower
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Box
      component="section"
      ref={headerRef}
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        px: { xs: 2.5, md: 3 },
        pt: { xs: 0, md: 10 }, // Minimized top padding on mobile
        pb: { xs: 5, md: 7 },
        color: "text.primary",
        boxSizing: "border-box",
        zIndex: 2,
      }}
    >
      {!isMobile && (
        <svg
          width="100%"
          height="82%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "visible",
            zIndex: 0,
            filter: "drop-shadow(0 0 14px rgba(255, 140, 66, 0.22))",
          }}
        >
          <defs>
            <linearGradient
              id="headerLineGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="600"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(255,140,66,0.98)" />
              <stop offset="48%" stopColor="rgba(244,183,106,0.78)" />
              <stop offset="100%" stopColor="rgba(132,215,211,0.52)" />
            </linearGradient>
          </defs>
          {headerPaths.map((path, i) => (
            <g key={i}>
              <path
                d={path}
                stroke="rgba(255,140,66,0.16)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="1"
                  to="0"
                  dur="1.2s"
                  fill="freeze"
                  begin={`${0.2 + i * 1.0}s`}
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.42 0 0.58 1"
                />
              </path>
              <path
                d={path}
                stroke="url(#headerLineGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(255, 77, 77, 0.24))",
                }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="1"
                  to="0"
                  dur="1.2s"
                  fill="freeze"
                  begin={`${0.2 + i * 1.0}s`}
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.42 0 0.58 1"
                />
              </path>
            </g>
          ))}
        </svg>
      )}

      <Box
        sx={{
          width: "100%",
          maxWidth: 1380, // Matched with Projects.jsx
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "minmax(0, 1.08fr) minmax(360px, 0.92fr)",
          gap: isMobile ? 4 : 5,
          alignItems: "flex-start", // Changed from center to allow manual vertical control
          boxSizing: "border-box",
        }}
      >
        <Box
          ref={textContentRef}
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
            gap: 2.25,
            maxWidth: 700,
            pl: isMobile ? 0 : 10, // Increased to push buttons and text further right
            minWidth: 0,
          }}
        >
          <Box
            ref={topPillRef}
            sx={{
              mt: 0,
              px: 2,
              py: 0.8,
              borderRadius: 999,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(12px)",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "secondary.main",
                boxShadow: "0 0 10px rgba(132, 215, 211, 0.6)",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                fontSize: "0.72rem",
              }}
            >
              FULL-STACK SYSTEMS FOR MODERN PRODUCTS
            </Typography>
          </Box>

          {/* Profile Photo - Mobile Only (Under Pill) */}
          {isMobile && (
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 240, // Reduced from 280
                width: "100%",
                mt: 4, // Added top margin for spacing from line
                mb: 0, // Removed bottom margin
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(132, 215, 211, 0.25) 0%, rgba(132, 215, 211, 0.05) 40%, transparent 70%)",
                  filter: "blur(4px)",
                }}
              />
              <Box
                component="img"
                src="/assets/profile.jpg"
                alt="Bartosz"
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: "32px",
                  zIndex: 1,
                  position: "relative",
                  border: `1px solid ${theme.palette.surface.strongBorder}`,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  transform: "rotate(-2deg)",
                }}
              />
            </Box>
          )}

          <Typography
            variant="h4"
            component="p"
            sx={{
              color: "rgba(255, 255, 255, 0.85)",
              fontWeight: 400,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              letterSpacing: "-0.01em",
              mb: -1,
            }}
            ref={helloRef}
          >
            Hello<span style={{ color: theme.palette.primary.stroke }}>.</span>{" "}
            I'm Bartosz
          </Typography>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: "2.4rem",
                sm: "3.5rem",
                md: "4.5rem",
                lg: "5rem",
              },
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "text.primary",
              maxWidth: { xs: "100%", md: "720px", lg: "850px" },
              textWrap: "balance",
            }}
          >
            I build complete systems, not isolated features.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 580,
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.6,
              textWrap: "pretty",
              overflowWrap: "anywhere",
              fontWeight: 400,
            }}
          >
            Full-stack engineer focused on scalable frontend systems, backend
            architecture, Web3 integrations, and AI-powered workflows. From
            React interfaces to smart contracts and infrastructure, I design and
            ship end-to-end products with strong ownership.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ pt: 1, pb: 1 }}
          >
            {(isMobile ? focusAreas.slice(0, 2) : focusAreas).map((item) => (
              <Box
                key={item}
                sx={{
                  px: 1.6,
                  py: 0.6,
                  borderRadius: 999,
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  color: "rgba(255, 255, 255, 0.55)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.02em",
                  maxWidth: "100%",
                  overflowWrap: "anywhere",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  },
                }}
              >
                {item}
              </Box>
            ))}
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            ref={ctaRef}
            alignItems={isMobile ? "center" : "flex-start"}
            justifyContent={isMobile ? "center" : "flex-start"}
            sx={{
              mt: 1.5,
              width: "100%",
              maxWidth: { xs: "100%", sm: "none" },
            }}
          >
            <Button
              ref={exploreBtnRef}
              variant={btnActive ? "contained" : "outlined"}
              onClick={handleScrollToProjects}
              sx={{
                minWidth: { xs: 220, sm: 168 },
                transition: "all 0.5s ease-in-out",
                color: btnActive ? "#1b1205" : "primary.fill",
                backgroundColor: btnActive ? "primary.fill" : "transparent",
                borderColor: "primary.fill",
                boxShadow: btnActive
                  ? `0 16px 38px ${theme.palette.surface.glow}`
                  : "none",
                "&:hover": {
                  backgroundColor: "primary.stroke",
                  borderColor: "primary.stroke",
                },
                position: "relative",
                zIndex: 100,
              }}
            >
              Explore Projects
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              ref={conversationBtnRef}
              sx={{
                minWidth: { xs: 220, sm: 148 },
                color: "text.primary",
                borderColor: "surface.strongBorder",
                backgroundColor: "rgba(15, 27, 33, 0.58)",
                backdropFilter: "blur(12px)",
                "&:hover": {
                  borderColor: "secondary.main",
                  color: "secondary.main",
                  backgroundColor: "rgba(132, 215, 211, 0.08)",
                },
              }}
            >
              Start a conversation
            </Button>
          </Stack>
        </Box>

        {!isMobile && (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: { xs: 440, md: 560 },
              mt: { xs: 2, md: -10 },
              ml: { xs: 0, md: 12 },
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: isMobile ? 250 : 350,
                height: isMobile ? 250 : 350,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(132, 215, 211, 0.3) 0%, rgba(132, 215, 211, 0.08) 38%, transparent 72%)",
                filter: "blur(4px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: isMobile ? 270 : 384,
                height: isMobile ? 270 : 384,
                borderRadius: "42px",
                border: `1px solid ${theme.palette.surface.border}`,
                boxShadow: `0 0 0 1px ${theme.palette.surface.strongBorder} inset`,
                background:
                  "linear-gradient(180deg, rgba(15, 27, 33, 0.35) 0%, rgba(15, 27, 33, 0.15) 100%)",
                backdropFilter: "blur(40px)",
                transform: "rotate(-6deg)",
              }}
            />

            <Box
              component="img"
              src="/assets/profile.jpg"
              alt="Bartosz"
              sx={{
                width: { xs: 240, md: 292 },
                height: { xs: 240, md: 350 },
                objectFit: "cover",
                borderRadius: "36px",
                zIndex: 1,
                position: "relative",
                border: `1px solid ${theme.palette.surface.strongBorder}`,
                boxShadow:
                  "0 28px 60px rgba(0, 0, 0, 0.34), 0 0 0 12px rgba(15, 27, 33, 0.42)",
                transform: { xs: "rotate(-2deg)", md: "rotate(3deg)" },
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: isMobile ? 8 : -8, // Even lower
                left: isMobile ? 12 : -132, // Even further left
                zIndex: 2,
                width: isMobile ? 220 : 280,
                p: 2.75,
                borderRadius: "24px",
                background: "rgba(10, 20, 25, 0.75)", // Darker for better contrast
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.1)", // Brighter border
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "secondary.main",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontSize: "0.64rem",
                    fontWeight: 800,
                    display: "block",
                    mb: 1,
                  }}
                >
                  Engineering Focus
                </Typography>

                <Box
                  sx={{
                    width: 36,
                    height: 2,
                    backgroundColor: "secondary.main",
                    borderRadius: 1,
                    mx: "auto",
                    mb: 0.5,
                    opacity: 0.8,
                  }}
                />
              </Box>

              <Stack spacing={2.4}>
                <Box
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <BoltRoundedIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: 20,
                      mt: "2px",
                      opacity: 0.9,
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "text.secondary",
                        letterSpacing: "0.06em",
                        lineHeight: 1.1,
                      }}
                    >
                      Ownership
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1.02rem",
                        fontWeight: 650,
                        color: "text.primary",
                        mt: 0.5,
                        lineHeight: 1.35,
                      }}
                    >
                      End-to-end product delivery
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <AccountTreeRoundedIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: 20,
                      mt: "2px",
                      opacity: 0.9,
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "text.secondary",
                        letterSpacing: "0.06em",
                        lineHeight: 1.1,
                      }}
                    >
                      Architecture
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1.02rem",
                        fontWeight: 650,
                        color: "text.primary",
                        mt: 0.5,
                        lineHeight: 1.35,
                      }}
                    >
                      Scalable full-stack systems
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <HubRoundedIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: 20,
                      mt: "2px",
                      opacity: 0.9,
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "text.secondary",
                        letterSpacing: "0.06em",
                        lineHeight: 1.1,
                      }}
                    >
                      Integrations
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1.02rem",
                        fontWeight: 650,
                        color: "text.primary",
                        mt: 0.5,
                        lineHeight: 1.35,
                      }}
                    >
                      Web3, APIs and AI workflows
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
