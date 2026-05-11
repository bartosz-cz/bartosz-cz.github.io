import {
  AutoAwesomeRounded as AiIcon,
  HubRounded as BlockchainIcon,
  LayersRounded as FullStackIcon,
} from "@mui/icons-material";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

const capabilityGroups = [
  {
    label: "Full-Stack Product",
    accent: "#ff8c42",
    icon: <FullStackIcon sx={{ fontSize: "1.6rem" }} />,
    summary:
      "End-to-end product engineering across interfaces, backend logic, APIs, databases, and realtime workflows.",
    featured: [
      "Product UX",
      "Frontend architecture",
      "Backend systems",
      "Database logic",
    ],
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Python",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    label: "Web3 Systems",
    accent: "#84d7d3",
    icon: <BlockchainIcon sx={{ fontSize: "1.6rem" }} />,
    summary:
      "Interfaces, backend services, and integrations for products built around smart contracts and on-chain logic.",
    featured: [
      "Smart contracts",
      "Wallet integrations",
      "DApp UX",
      "Protocol logic",
    ],
    skills: [
      "Solidity",
      "ERC-20",
      "ERC-721",
      "ERC-1155",
      "Hedera",
      "Web3.js",
      "DApps",
      "Blockchain",
    ],
  },
  {
    label: "AI & Delivery",
    accent: "#f4b76a",
    icon: <AiIcon sx={{ fontSize: "1.6rem" }} />,
    summary:
      "AI integrations, automation, deployment setup, and engineering workflows that keep shipping maintainable.",
    featured: [
      "AI integrations",
      "Workflow automation",
      "Deployment setup",
      "Team workflows",
    ],
    skills: [
      "LLMs",
      "Automation",
      "Docker",
      "CI/CD",
      "Git",
      "GitHub",
      "GitLab",
      "Testing",
    ],
  },
];

export default function SkillWall({ skillWallRef }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      ref={skillWallRef}
      component="section"
      aria-labelledby="skills-heading"
      sx={{
        position: "relative",
        width: "100%",
        zIndex: 10,
        px: { xs: 4, md: 10 },
        pb: { xs: 6, md: 10 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          background:
            "radial-gradient(circle, rgba(132, 215, 211, 0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          width: "100%",
          maxWidth: 1280,
          mx: "auto",
          p: { xs: 2.5, md: 5 },
          borderRadius: { xs: "24px", md: "40px" },
          border: `1px solid ${theme.palette.surface.border}`,
          background: "rgba(15, 27, 33, 0.72)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
          boxSizing: "border-box",
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={{ xs: 3, md: 4 }}
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          <Box sx={{ maxWidth: 760 }}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                letterSpacing: "0.25em",
                fontWeight: 700,
                display: "block",
                mb: 2,
              }}
            >
              Capabilities
            </Typography>

            <Typography
              variant="h3"
              component="h2"
              id="skills-heading"
              sx={{
                color: "text.primary",
                mb: 2,
                fontWeight: 500,
                lineHeight: 1.1,
                fontSize: { xs: "1.75rem", md: "2.75rem" },
                maxWidth: 760,
              }}
            >
              I build where product logic, architecture, and user experience
              need to work as one.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.6,
                maxWidth: 640,
              }}
            >
              Clean interfaces, reliable backend systems, Web3 integrations, and
              automation delivered as one product.
            </Typography>
          </Box>

          <Box
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: { xs: "16px", md: "24px" },
              border: "1px solid rgba(132, 215, 211, 0.1)",
              background: "rgba(132, 215, 211, 0.03)",
              maxWidth: { md: 360 },
              width: isMobile ? "100%" : "auto",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "secondary.main",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 700,
                display: "block",
                mb: 1,
              }}
            >
              Best Fit
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                fontSize: "0.95rem",
                lineHeight: 1.5,
              }}
            >
              Technical products that need one engineer to connect frontend,
              backend, APIs, smart contracts, and AI workflows.
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {capabilityGroups.map((group) => (
            <Box
              key={group.label}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                p: { xs: 3, md: 4 },
                borderRadius: { xs: "24px", md: "32px" },
                background: "rgba(10, 20, 25, 0.4)",
                border: `1px solid ${theme.palette.surface.border}`,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "rgba(15, 27, 33, 0.6)",
                  borderColor: group.accent,
                  transform: "translateY(-4px)",
                  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px ${group.accent} inset`,
                  "& .group-icon": {
                    color: group.accent,
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 40,
                  bottom: 40,
                  width: "2px",
                  background: `linear-gradient(to bottom, transparent, ${group.accent}, transparent)`,
                  opacity: 0.5,
                }}
              />

              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  className="group-icon"
                  sx={{
                    color: "text.secondary",
                    transition: "all 0.4s ease",
                    display: "flex",
                  }}
                >
                  {group.icon}
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {group.label}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                  mb: { xs: 3, md: 4 },
                  fontSize: "0.92rem",
                  flexGrow: 1,
                }}
              >
                {group.summary}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    display: "block",
                    mb: 1.5,
                    opacity: 0.6,
                  }}
                >
                  Key Focus
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {group.featured.map((item, index) => (
                    <Typography
                      key={item}
                      variant="caption"
                      sx={{
                        color: "text.primary",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        "&::after": {
                          content: '" •"',
                          mx: 1,
                          opacity: 0.3,
                          display:
                            index === group.featured.length - 1
                              ? "none"
                              : "inline",
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    display: "block",
                    mb: 1.5,
                    opacity: 0.6,
                  }}
                >
                  Stack
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {group.skills.map((skill) => (
                    <Box
                      key={skill}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "text.secondary",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: group.accent,
                          borderColor: group.accent,
                          background: "rgba(255, 255, 255, 0.06)",
                        },
                      }}
                    >
                      {skill}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
