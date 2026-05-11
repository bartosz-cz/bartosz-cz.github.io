import { useEffect, useMemo, useState } from "react";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const ProjectCard = ({
  projectIndex = 0,
  title,
  category,
  status,
  lead,
  problem,
  solution,
  role,
  highlights = [],
  stack = [],
  images = [],
  links = [],
  galleryLabel = "Gallery",
  stepLabel,
  timelineState,
  fillWidth = "100%",
  year,
}) => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const galleryItems = useMemo(
    () =>
      images.map((item, index) =>
        typeof item === "string"
          ? {
              src: item,
              alt: `${title} image ${index + 1}`,
              caption: `${galleryLabel} ${index + 1}`,
            }
          : item,
      ),
    [galleryLabel, images, title],
  );

  const mainImage = galleryItems[selectedIndex] ??
    galleryItems[0] ?? {
      src: "/assets/profile.jpg",
      alt: title,
      caption: "Project preview",
    };

  const projectTitleId = `project-title-${projectIndex}`;
  const galleryHeadingId = `project-gallery-${projectIndex}`;
  const statusTone =
    timelineState === "current" ? "secondary.main" : "text.secondary";

  const handleNext = () => {
    if (!galleryItems.length) return;
    setSelectedIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    if (!galleryItems.length) return;
    setSelectedIndex(
      (prev) => (prev + galleryItems.length - 1) % galleryItems.length,
    );
  };

  useEffect(() => {
    if (!openDialog) return undefined;

    const goNext = () => {
      if (!galleryItems.length) return;
      setSelectedIndex((prev) => (prev + 1) % galleryItems.length);
    };

    const goPrev = () => {
      if (!galleryItems.length) return;
      setSelectedIndex(
        (prev) => (prev + galleryItems.length - 1) % galleryItems.length,
      );
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenDialog(false);
      }
      if (event.key === "ArrowRight") {
        goNext();
      }
      if (event.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openDialog, galleryItems.length]);

  return (
    <Box
      component="article"
      aria-labelledby={projectTitleId}
      sx={{
        width: fillWidth,
        minWidth: 0,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 1.04fr) minmax(380px, 0.96fr)",
          },
          gap: { xs: 2, md: 2.25, lg: 2.5 },
          alignItems: "stretch",
          minWidth: 0,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, md: 2.5 },
            minWidth: 0,
            height: "100%",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 }, // Reduced mobile padding
              borderRadius: { xs: 1.5, md: 2 },
              background:
                "linear-gradient(180deg, rgba(15, 27, 33, 0.96) 0%, rgba(10, 20, 25, 0.84) 100%)",
              boxShadow:
                "0 22px 48px rgba(0,0,0,0.24), 0 0 0 1px rgba(255,255,255,0.02) inset",
              boxSizing: "border-box",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {year && (
              <Typography
                variant="h2"
                sx={{
                  position: "absolute",
                  top: { xs: 10, md: 16 },
                  right: { xs: 14, md: 22 },
                  fontSize: { xs: "2.4rem", md: "3.2rem" },
                  fontWeight: 900,
                  color: "rgba(255, 255, 255, 0.12)",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                  letterSpacing: "-0.02em",
                  fontFamily: theme.typography.h1.fontFamily,
                }}
              >
                {year}
              </Typography>
            )}
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ mb: 1.4, pr: 8 }}
            >
              {stepLabel && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    px: 1.1,
                    py: 0.45,
                    borderRadius: 999,
                    backgroundColor:
                      timelineState === "current"
                        ? "rgba(244, 183, 106, 0.14)"
                        : "rgba(132, 215, 211, 0.08)",
                    border: `1px solid ${
                      timelineState === "current"
                        ? theme.palette.primary.stroke
                        : theme.palette.surface.border
                    }`,
                    color:
                      timelineState === "current"
                        ? "primary.fill"
                        : "text.secondary",
                    fontFamily: theme.typography.button.fontFamily,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    maxWidth: "100%",
                    overflowWrap: "anywhere",
                  }}
                >
                  {stepLabel}
                </Box>
              )}

              {category && (
                <Box
                  component="span"
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    px: 1.1,
                    py: 0.45,
                    borderRadius: 999,
                    border: `1px solid ${theme.palette.surface.border}`,
                    color: "text.secondary",
                    backgroundColor: "rgba(15, 27, 33, 0.5)",
                    fontFamily: theme.typography.button.fontFamily,
                    fontSize: "0.72rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    maxWidth: "100%",
                    overflowWrap: "anywhere",
                  }}
                >
                  {category}
                </Box>
              )}

              {status && (
                <Box
                  component="span"
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    px: 1.1,
                    py: 0.45,
                    borderRadius: 999,
                    border: `1px solid ${theme.palette.surface.border}`,
                    color: statusTone,
                    backgroundColor: "rgba(15, 27, 33, 0.5)",
                    fontFamily: theme.typography.button.fontFamily,
                    fontSize: "0.72rem",
                    letterSpacing: "0.06em",
                    maxWidth: "100%",
                    overflowWrap: "anywhere",
                  }}
                >
                  {status}
                </Box>
              )}
            </Stack>

            <Typography
              variant="h4"
              component="h3"
              id={projectTitleId}
              sx={{
                color: "text.primary",
                mb: 1.5,
                lineHeight: 1.2,
                fontWeight: 700,
                fontSize: { xs: "1.4rem", md: "1.75rem" },
                overflowWrap: "anywhere",
                pr: { md: 12 }, // Ensure title doesn't overlap date
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                fontSize: { xs: "0.9rem", md: "0.96rem" },
                lineHeight: 1.5,
                mb: 3,
                maxWidth: "100%",
                overflowWrap: "anywhere",
              }}
            >
              {lead}
            </Typography>

            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "secondary.main",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Problem
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", overflowWrap: "anywhere" }}
                >
                  {problem}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "secondary.main",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Solution
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", overflowWrap: "anywhere" }}
                >
                  {solution}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "secondary.main",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  My role
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", overflowWrap: "anywhere" }}
                >
                  {role}
                </Typography>
              </Box>

              {highlights.length > 0 && (
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "secondary.main",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      mb: 1.2,
                    }}
                  >
                    Key points
                  </Typography>
                  <Stack spacing={1.2}>
                    {highlights.map((item) => (
                      <Box
                        key={item}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.2,
                          p: 1.4,
                          borderRadius: 1,
                          backgroundColor: "rgba(15, 27, 33, 0.35)",
                          border: `1px solid rgba(255, 140, 66, 0.08)`,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: "rgba(255, 140, 66, 0.2)",
                            backgroundColor: "rgba(15, 27, 33, 0.5)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            mt: 0.6,
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            flexShrink: 0,
                            backgroundColor: "primary.fill",
                            boxShadow: "0 0 8px rgba(255, 140, 66, 0.4)",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            lineHeight: 1.5,
                            fontSize: "0.88rem",
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              {stack.length > 0 && (
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "secondary.main",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      mb: 1.2,
                    }}
                  >
                    Stack
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {stack.map((tech) => (
                      <Box
                        key={tech}
                        sx={{
                          px: 1.2,
                          py: 0.6,
                          borderRadius: 1,
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          backgroundColor: "rgba(244, 183, 106, 0.06)",
                          border: `1px solid rgba(244, 183, 106, 0.15)`,
                          color: "primary.fill",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "rgba(244, 183, 106, 0.14)",
                            borderColor: "primary.fill",
                          },
                        }}
                      >
                        {tech}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Paper>
        </Box>

        <Paper
          component="section"
          aria-labelledby={galleryHeadingId}
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 }, // Reduced mobile padding
            borderRadius: { xs: 1.5, md: 2 },
            background:
              "linear-gradient(180deg, rgba(14, 24, 30, 0.96) 0%, rgba(9, 18, 22, 0.88) 100%)",
            display: "grid",
            gap: 0.75,
            boxSizing: "border-box",
            minWidth: 0,
            overflow: "hidden",
            height: "100%",
            gridTemplateRows: "auto auto auto auto auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              mb: 0.5,
            }}
          >
            <Typography
              variant="body2"
              component="h4"
              id={galleryHeadingId}
              sx={{
                color: "secondary.main",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {galleryLabel}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  px: 1.4,
                  py: 0.6,
                  borderRadius: 1,
                  backgroundColor: "rgba(15, 27, 33, 0.5)",
                  border: `1px solid ${theme.palette.surface.border}`,
                  color: "text.secondary",
                  fontFamily: theme.typography.button.fontFamily,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                <Box component="span" sx={{ color: "text.primary" }}>
                  {String(selectedIndex + 1).padStart(2, "0")}
                </Box>
                <Box component="span" sx={{ mx: 0.8, opacity: 0.4 }}>
                  /
                </Box>
                {String(Math.max(galleryItems.length, 1)).padStart(2, "0")}
              </Box>

              {galleryItems.length > 1 && (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="Previous image"
                    onClick={handlePrev}
                    sx={{
                      width: 34,
                      height: 34,
                      color: "text.primary",
                      border: `1px solid ${theme.palette.surface.border}`,
                      backgroundColor: "rgba(15, 27, 33, 0.55)",
                      "&:hover": {
                        backgroundColor: "rgba(132, 215, 211, 0.08)",
                        color: "secondary.main",
                        borderColor: "secondary.main",
                      },
                    }}
                  >
                    <ArrowBackIosNew sx={{ fontSize: "0.9rem" }} />
                  </IconButton>
                  <IconButton
                    aria-label="Next image"
                    onClick={handleNext}
                    sx={{
                      width: 34,
                      height: 34,
                      color: "text.primary",
                      border: `1px solid ${theme.palette.surface.border}`,
                      backgroundColor: "rgba(15, 27, 33, 0.55)",
                      "&:hover": {
                        backgroundColor: "rgba(132, 215, 211, 0.08)",
                        color: "secondary.main",
                        borderColor: "secondary.main",
                      },
                    }}
                  >
                    <ArrowForwardIos sx={{ fontSize: "0.9rem" }} />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Box>

          <Box
            component="button"
            type="button"
            aria-label={`Open full screen gallery for ${title}`}
            onClick={() => setOpenDialog(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpenDialog(true);
              }
            }}
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "100%",
              aspectRatio: { xs: "16 / 11", lg: "16 / 10" },
              minHeight: { lg: 380 },
              background:
                "linear-gradient(180deg, rgba(7, 17, 22, 0.92) 0%, rgba(9, 19, 24, 0.98) 100%)",
              borderRadius: 1.5,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${theme.palette.surface.border}`,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 12,
                left: 14,
                display: "flex",
                gap: 0.75,
                zIndex: 2,
              }}
            >
              {["#ff8c42", "#f4b76a", "#84d7d3"].map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    backgroundColor: color,
                  }}
                />
              ))}
            </Box>

            {galleryItems.length > 1 && (
              <>
                <IconButton
                  aria-label="Previous image"
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePrev();
                  }}
                  sx={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "#fff",
                    backgroundColor: "rgba(15, 27, 33, 0.72)",
                    border: `1px solid ${theme.palette.surface.border}`,
                    "&:hover": {
                      backgroundColor: "rgba(15, 27, 33, 0.92)",
                    },
                  }}
                >
                  <ArrowBackIosNew fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="Next image"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNext();
                  }}
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "#fff",
                    backgroundColor: "rgba(15, 27, 33, 0.72)",
                    border: `1px solid ${theme.palette.surface.border}`,
                    "&:hover": {
                      backgroundColor: "rgba(15, 27, 33, 0.92)",
                    },
                  }}
                >
                  <ArrowForwardIos fontSize="small" />
                </IconButton>
              </>
            )}

            <Box
              component="img"
              src={mainImage.src}
              alt={mainImage.alt}
              loading="lazy"
              sx={{
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                maxHeight: "100%",
                objectFit: "contain",
                p: { xs: 1, md: 1.2 },
                pb: { xs: 5.5, md: 6 },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                px: 2,
                py: 1.75,
                textAlign: "center",
                background: "rgba(15, 27, 33, 0.65)",
                backdropFilter: "blur(12px)",
                borderTop: `1px solid ${theme.palette.surface.border}`,
                zIndex: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {mainImage.caption}
              </Typography>
            </Box>
          </Box>

          {galleryItems.length > 1 && (
            <Stack
              direction="row"
              spacing={1.1}
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
              sx={{ mt: 1.5 }}
            >
              {galleryItems.map((item, index) => (
                <Box
                  key={item.src}
                  component="button"
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Show slide ${index + 1} for ${title}`}
                  aria-pressed={index === selectedIndex}
                  sx={{
                    width: { xs: 60, md: 64 },
                    height: { xs: 60, md: 64 },
                    borderRadius: 1,
                    cursor: "pointer",
                    border: "none",
                    padding: 0,
                    backgroundColor: "transparent",
                    opacity: index === selectedIndex ? 1 : 0.74,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    transform:
                      index === selectedIndex ? "translateY(-2px)" : "none",
                  }}
                >
                  <Box
                    component="img"
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 1,
                      objectFit: "cover",
                      display: "block",
                      border:
                        index === selectedIndex
                          ? `2px solid ${theme.palette.secondary.main}`
                          : `1px solid ${theme.palette.surface.border}`,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          )}

          {links.length > 0 && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.25}
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center" // Centering in column view
              sx={{ mt: "auto", pt: 1.5, width: "100%" }}
            >
              {links.map((link) =>
                link.type === "outlined" ? (
                  <Button
                    key={link.label}
                    variant="outlined"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      minWidth: 140,
                      maxWidth: 220,
                      color: "text.primary",
                      borderColor: "surface.strongBorder",
                      backgroundColor: "rgba(15, 27, 33, 0.55)",
                      "&:hover": {
                        borderColor: "secondary.main",
                        color: "secondary.main",
                        backgroundColor: "rgba(132, 215, 211, 0.08)",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ) : (
                  <Button
                    key={link.label}
                    variant="contained"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      minWidth: 140,
                      maxWidth: 220,
                      color: "#1f1508",
                      backgroundColor: "primary.fill",
                      boxShadow: `0 12px 28px ${theme.palette.surface.glow}`,
                      "&:hover": {
                        backgroundColor: "primary.stroke",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ),
              )}
            </Stack>
          )}
        </Paper>
      </Box>

      <Dialog
        fullScreen
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby={`gallery-dialog-title-${projectIndex}`}
      >
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            p: 0,
            m: 0,
            backgroundColor: "#050d10",
            minHeight: "100vh",
          }}
        >
          <Box
            component="img"
            src={mainImage.src}
            alt={mainImage.alt}
            sx={{
              width: "100%",
              height: "auto",
              p: { xs: 3, md: 10 },
              maxHeight: "100vh",
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              left: { xs: 16, md: 28 },
              bottom: { xs: 18, md: 28 },
              maxWidth: 420,
              px: 2,
              py: 1.5,
              borderRadius: 1,
              border: `1px solid ${theme.palette.surface.border}`,
              backgroundColor: "rgba(15, 27, 33, 0.74)",
              backdropFilter: "blur(14px)",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.primary", mb: 0.3 }}>
              <Box component="span" id={`gallery-dialog-title-${projectIndex}`}>
                {mainImage.caption}
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Slide {selectedIndex + 1} of {Math.max(galleryItems.length, 1)}.
              Use left and right arrow keys to navigate.
            </Typography>
          </Box>

          {galleryItems.length > 1 && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: { xs: 1, md: 2 },
              }}
            >
              <IconButton
                aria-label="Previous image"
                onClick={handlePrev}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(15, 27, 33, 0.72)",
                  border: `1px solid ${theme.palette.surface.border}`,
                  "&:hover": {
                    backgroundColor: "rgba(15, 27, 33, 0.92)",
                  },
                }}
              >
                <ArrowBackIosNew fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="Next image"
                onClick={handleNext}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(15, 27, 33, 0.72)",
                  border: `1px solid ${theme.palette.surface.border}`,
                  "&:hover": {
                    backgroundColor: "rgba(15, 27, 33, 0.92)",
                  },
                }}
              >
                <ArrowForwardIos fontSize="large" />
              </IconButton>
            </Box>
          )}

          <IconButton
            aria-label="Close gallery"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#fff",
              backgroundColor: "rgba(15, 27, 33, 0.72)",
              border: `1px solid ${theme.palette.surface.border}`,
              "&:hover": {
                backgroundColor: "rgba(15, 27, 33, 0.92)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProjectCard;
