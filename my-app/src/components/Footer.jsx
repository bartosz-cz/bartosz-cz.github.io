import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/bartosz-cz",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/czarnecki-bartosz/",
    icon: LinkedInIcon,
  },
];

const Footer = ({ setOpen }) => {
  return (
    <Box
      component="footer"
      aria-labelledby="footer-heading"
      sx={{
        position: "relative",
        width: "100%",
        pt: 8,
        pb: 5,
        px: 2,
        borderTop: "1px solid rgba(244, 183, 106, 0.12)",
        textAlign: "center",
        background:
          "linear-gradient(180deg, rgba(7, 17, 22, 0.45) 0%, rgba(7, 17, 22, 0.98) 100%)",
        color: "text.secondary",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          maxWidth: 820,
          mx: "auto",
          p: { xs: 4, md: 6 },
          borderRadius: 2,
          border: "1px solid rgba(244, 183, 106, 0.1)",
          background:
            "linear-gradient(180deg, rgba(15, 27, 33, 0.92) 0%, rgba(9, 18, 23, 0.88) 100%)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
          backdropFilter: "blur(20px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "secondary.main",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            mb: 2,
            fontSize: "0.72rem",
            fontWeight: 700,
          }}
        >
          Available for selected work
        </Typography>

        <Typography
          variant="h3"
          component="h2"
          id="footer-heading"
          sx={{
            color: "text.primary",
            mb: 2,
            maxWidth: "22ch",
            mx: "auto",
            textWrap: "balance",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Need someone who can connect product, code, and architecture?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 560,
            mx: "auto",
            color: "text.secondary",
            mb: 4,
            fontSize: "0.96rem",
            lineHeight: 1.6,
          }}
        >
          I am open to full stack work across Web2 and Web3, whether it is
          building focused product features, improving existing systems, or
          taking technical ownership from idea to production.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              minWidth: 200,
              py: 1.4,
              borderRadius: 1,
              color: "#1f1508",
              backgroundColor: "primary.fill",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "primary.stroke",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Start a conversation
          </Button>

          <Button
            component="a"
            href="mailto:bartoszczarnecki2003@gmail.com"
            variant="outlined"
            sx={{
              minWidth: 200,
              py: 1.4,
              borderRadius: 1,
              color: "text.primary",
              borderColor: "rgba(255, 255, 255, 0.12)",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              fontWeight: 600,
              "&:hover": {
                borderColor: "secondary.main",
                color: "secondary.main",
                backgroundColor: "rgba(132, 215, 211, 0.08)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Email directly
          </Button>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pt: 4,
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            gap: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.7, fontSize: "0.82rem" }}
          >
            © {new Date().getFullYear()} Bartosz Czarnecki. Built end to end.
          </Typography>

          <Stack direction="row" spacing={1.5}>
            {contactLinks.map((item) => {
              const Icon = item.icon;

              return (
                <IconButton
                  key={item.label}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  sx={{
                    color: "text.secondary",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "primary.fill",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              );
            })}

            <IconButton
              onClick={() => setOpen(true)}
              aria-label="Contact"
              sx={{
                color: "text.secondary",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "primary.fill",
                  transform: "scale(1.1)",
                },
              }}
            >
              <EmailIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
