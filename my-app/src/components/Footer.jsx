import { Box, Stack, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Footer = ({ setOpen }) => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 4,

        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        textAlign: "center",
        backgroundColor: "background.default",
        color: "#ccc",
      }}
    >
      {/* Ikony społecznościowe */}
      <Stack direction="row" spacing={3} justifyContent="center" mb={1}>
        <IconButton
          component="a"
          href="https://github.com/bartosz-cz"
          target="_blank"
          rel="noopener"
          sx={{ color: "primary.fill" }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/czarnecki-bartosz/"
          target="_blank"
          rel="noopener"
          sx={{ color: "primary.fill" }}
        >
          <LinkedInIcon />
        </IconButton>

        <IconButton
          component="a"
          onClick={() => setOpen(true)}
          sx={{ color: "primary.fill" }}
        >
          <EmailIcon />
        </IconButton>
      </Stack>

      {/* Tekst dolny */}
      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} Bartosz Czarnecki — designed & built by me.
      </Typography>
    </Box>
  );
};

export default Footer;
