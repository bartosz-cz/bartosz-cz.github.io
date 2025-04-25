import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

function Contact() {
  return (
    <Box sx={{ marginTop: 8 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: "center" }}>
        Contact
      </Typography>
      <Box
        component="form"
        sx={{
          maxWidth: 500,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Contact;
