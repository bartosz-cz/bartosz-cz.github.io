import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTheme } from "@mui/material";
const ContactDialog = ({ open, onClose }) => {
  const [form, setForm] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const theme = useTheme();
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(true); // true = success, false = error

  const handleSend = async () => {
    try {
      await emailjs.send(
        "service_46kzkb4",
        "template_u5fe93a",
        {
          subject: form.subject,
          email: form.email,
          message: form.message,
        },
        "3qWTzyBSnDoR_4myn"
      );

      setForm({ subject: "", email: "", message: "" });
      setSuccess(true);
      setSnackbarOpen(true); // 👈 otwórz Snackbar
      onClose();
    } catch (err) {
      console.error(err);
      setSuccess(false);
      setSnackbarOpen(true); // 👈 pokaż błąd
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: "background.paper",
          textAlign: "center",
        }}
      >
        Contact Me
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "background.paper" }}>
        <Stack spacing={2} mt={1}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.fill,
                },
              },
              "& .MuiInputLabel-root": {
                color: "#aaa", // domyślny kolor labela
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.primary.fill,
              },
            }}
            label="Your Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.fill,
                },
              },
              "& .MuiInputLabel-root": {
                color: "#aaa", // domyślny kolor labela
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.primary.fill,
              },
            }}
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.fill,
                },
              },
              "& .MuiInputLabel-root": {
                color: "#aaa", // domyślny kolor labela
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.primary.fill,
              },
            }}
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{ backgroundColor: "background.paper", justifyContent: "center" }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            color: "#fff",
            width: 100,
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
          variant={"contained"}
          onClick={handleSend}
          sx={{
            transition: "all 0.5s ease-in-out",
            color: "#000",
            width: 100,
            backgroundColor: theme.palette.primary.fill,
            borderColor: theme.palette.primary.fill,
            "&:hover": {
              backgroundColor: theme.palette.primary.stroke,
            },
          }}
        >
          Send
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success ? "Message sent successfully!" : "Failed to send message."}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ContactDialog;
