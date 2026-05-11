import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useTheme } from "@mui/material";
import emailjs from "@emailjs/browser";

const INITIAL_FORM = {
  subject: "",
  email: "",
  message: "",
};

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

const ContactDialog = ({ open, onClose }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const theme = useTheme();

  const inputStyles = useMemo(
    () => ({
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.primary.fill,
        },
      },
      "& .MuiInputLabel-root": {
        color: "#aaa",
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: theme.palette.primary.fill,
      },
      "& .MuiFormHelperText-root": {
        ml: 0,
      },
    }),
    [theme],
  );

  const validateForm = () => {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject = "Subject is required.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (form.message.trim().length < 20) {
      nextErrors.message = "Message should be at least 20 characters long.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleDialogClose = () => {
    if (isSending) return;
    onClose();
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setIsSending(true);
    try {
      await emailjs.send(
        "service_46kzkb4",
        "template_u5fe93a",
        {
          subject: form.subject.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        },
        "3qWTzyBSnDoR_4myn",
      );

      setForm(INITIAL_FORM);
      setErrors({});
      setSuccess(true);
      setSnackbarOpen(true);
      onClose();
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setSnackbarOpen(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
    >
      <DialogTitle
        id="contact-dialog-title"
        sx={{
          backgroundColor: "background.paper",
          textAlign: "center",
          pb: 1,
        }}
      >
        Contact Me
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "background.paper", pt: 1 }}>
        <Stack spacing={2}>
          <Typography
            variant="body2"
            id="contact-dialog-description"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            Tell me what you are building, what stage you are at, and where you
            need the most help.
          </Typography>

          <TextField
            sx={inputStyles}
            label="Your Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
          <TextField
            sx={inputStyles}
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            autoComplete="off"
            error={Boolean(errors.subject)}
            helperText={errors.subject}
            fullWidth
          />
          <TextField
            sx={inputStyles}
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            autoComplete="off"
            error={Boolean(errors.message)}
            helperText={errors.message ?? ""}
            multiline
            rows={5}
            fullWidth
          />

          <Stack
            spacing={0.6}
            sx={{
              p: 1.4,
              borderRadius: 1,
              border: `1px solid ${theme.palette.surface.border}`,
              backgroundColor: "rgba(15, 27, 33, 0.42)",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              Prefer a direct route?
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You can also reach me at{" "}
              <Link
                href="mailto:bartoszczarnecki2003@gmail.com"
                underline="hover"
                sx={{ color: "text.primary" }}
              >
                bartoszczarnecki2003@gmail.com
              </Link>
              .
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "background.paper",
          justifyContent: "center",
          gap: 1,
          pb: 2.5,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleDialogClose}
          disabled={isSending}
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
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={isSending}
          sx={{
            transition: "all 0.5s ease-in-out",
            color: "#000",
            minWidth: 140,
            backgroundColor: theme.palette.primary.fill,
            borderColor: theme.palette.primary.fill,
            "&:hover": {
              backgroundColor: theme.palette.primary.stroke,
            },
          }}
        >
          {isSending ? "Sending..." : "Send message"}
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success
            ? "Message sent successfully. I will get back to you soon."
            : "Message could not be sent. Please try again or use the direct email link."}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ContactDialog;
