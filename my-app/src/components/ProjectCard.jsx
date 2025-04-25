import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ZoomIn, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Close as CloseIcon } from "@mui/icons-material";
const ProjectCard = ({
  title,
  description,
  images = [],
  links = [],
  align = "left",
  fillHeight = 400,
  fillWidth = 400,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  // If no images, fallback
  const mainImage =
    images[selectedIndex] ||
    "https://via.placeholder.com/400x300.png?text=Project";

  // Next/Prev handlers for arrows (optional)
  const handleNext = () => {
    if (!images.length) return;
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (!images.length) return;
    setSelectedIndex((prev) => (prev + images.length - 1) % images.length);
  };

  // Handle thumbnail click
  const handleThumbnailClick = (idx) => {
    setSelectedIndex(idx);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
        },
        //border: "2px solid red",
        alignItems: "center",
        justifyContent: "center",
        width: fillWidth,
        maxHeight: fillHeight,
        gap: 3,
        height: fillHeight,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "column",
          },
          // border: "2px solid red", // czerwona ra
          alignItems: "center",
          gap: 2,
          minHeight: 0,
          maxHeight: {
            xs: "50%",
            sm: "50%",
            md: "100%",
          },
          height: {
            xs: "50%",
            sm: "50%",
            md: "100%",
          },
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "50%",
          },
          width: {
            xs: "100%",
            sm: "100%",
            md: "50%",
          },
          // ewentualnie wymiary, ramki, itp.
        }}
      >
        {/* KARTA (Paper) z tekstem – bez przycisków */}
        <Paper
          elevation={4}
          sx={{
            p: 2,
            flexGrow: 1,
            minHeight: 0,
            // border: "2px solid red",
            borderRadius: 3,
            flex: 1,
            height: "100%",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Tytuł na górze */}
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 2,
              flexShrink: 0,
            }}
            gutterBottom
          >
            {title}
          </Typography>

          {/* Opis w ograniczonym kontenerze */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              overflow: "auto",
              textAlign: "center",
              px: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#ccc",
                overflowWrap: "break-word", // wymuszaj łamanie długich słów
                wordBreak: "break-word", // wymuszaj łamanie ciągów bez spacji
                maxHeight: "100%", // krytyczne!
                overflowY: "auto", // przewijanie tekstu wewnątrz
                textAlign: "justify",
                hyphens: "auto", // łamanie wyrazów (działa dobrze w nowoczesnych przeglądarkach)
              }}
            >
              {description}
            </Typography>
          </Box>
        </Paper>

        {/* PRZYCISKI – osobny kontener (Stack) obok/dołu Paper */}
        {links.length > 0 && (
          <Stack
            direction={{ xs: "row", sm: "column", md: "row" }} // Always horizontal
            flexWrap="nowrap" // Prevent wrapping to the next line
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              m: 1,
              overflowX: "auto", // Allows horizontal scroll on smaller screens
              scrollbarWidth: "none", // Optional: hide scrollbar on Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Optional: hide scrollbar on Chrome/Safari
              },
            }}
          >
            {links.map((link, i) =>
              link.type === "outlined" ? (
                <Button
                  key={i}
                  variant="outlined"
                  href={link.href}
                  target="_blank"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    width: 120,
                    whiteSpace: "nowrap", // Prevent button text from wrapping
                    "&:hover": {
                      borderColor: "primary.fill",
                      color: "primary.fill",
                      backgroundColor: "background.default",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ) : (
                <Button
                  key={i}
                  variant="contained"
                  href={link.href}
                  sx={{
                    transition: "all 0.5s ease-in-out",
                    color: "#000",
                    backgroundColor: theme.palette.primary.fill,
                    width: 120,
                    whiteSpace: "nowrap",
                    borderColor: theme.palette.primary.fill,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.stroke,
                    },
                  }}
                >
                  {link.label}
                </Button>
              )
            )}
          </Stack>
        )}
      </Box>

      <Paper
        sx={{
          flex: 1,
          display: "flex",
          minHeight: 0,
          flexDirection: {
            sm: "row", // ≥600px (małe tablety)
            md: "column",
          },
          p: 2,
          gap: 2,
          borderRadius: 3,
          maxHeight: {
            xs: "50%",
            sm: "50%",
            md: "100%",
          },
          height: {
            xs: "50%",
            sm: "50%", // ≥600px (małe tablety)
            md: "100%",
          },
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "50%",
          },
          width: {
            xs: "100%",
            sm: "100%", // ≥600px (małe tablety)
            md: "50%",
          },
        }}
      >
        {/* Główne zdjęcie z overlay strzałek */}
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#000",
            borderRadius: 2,
            overflow: "hidden",
            flexGrow: 1, // wypełnia wolną przestrzeń w pionie
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={mainImage}
            alt={title}
            onClick={() => {
              console.log("test");
              setOpenDialog(true);
            }}
            sx={{
              maxHeight: "100%",
              p: 2,
              cursor: "pointer",
              width: "100%",
              height: "100%",
              zIndex: 100,
              objectFit: "contain",
            }}
          />

          {/* Strzałki nawigacji, jeśli jest wiele obrazów */}
        </Box>

        {/* Rząd miniaturek (jeśli więcej niż 1 zdjęcie) */}
        {images.length > 1 && (
          <Stack
            direction={{
              xs: "column", // <600px
              sm: "column", // ≥600px
              md: "row", // ≥900px
            }}
            spacing={1}
            justifyContent="center"
          >
            {images.map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={`${title}-thumb-${idx}`}
                onClick={() => handleThumbnailClick(idx)}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 1,
                  objectFit: "cover",
                  cursor: "pointer",
                  border: idx === selectedIndex ? "2px solid #fff" : "none",
                }}
              />
            ))}
          </Stack>
        )}
      </Paper>

      {/* Dialog pełnoekranowy po kliknięciu */}
      <Dialog fullScreen open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent
          sx={{
            // Kluczowe ustawienia:
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            p: 0,
            m: 0,
            backgroundColor: "#000",
            minHeight: "100vh", // by mieć do czego centrować
          }}
        >
          {/* Zdjęcie */}
          <Box
            component="img"
            src={mainImage}
            alt={title}
            sx={{
              width: "100%",
              height: "auto",
              p: 10,
              maxHeight: "100vh",
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
            }}
          />

          {/* Strzałki zmiany zdjęć w pełnym ekranie */}
          {images.length > 1 && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
              }}
            >
              <IconButton
                onClick={handlePrev}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                }}
              >
                <ArrowBackIosNew fontSize="large" />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                }}
              >
                <ArrowForwardIos fontSize="large" />
              </IconButton>
            </Box>
          )}

          {/* Przycisk zamykania w prawym górnym rogu */}
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.3)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
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
