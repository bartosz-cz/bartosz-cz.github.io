import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

function About() {
  return (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <Avatar
        alt="Profile Picture"
        src="/assets/profile.jpg"
        sx={{ width: 120, height: 120, margin: "0 auto" }}
      />
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        John Doe
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        I’m a blockchain and dApps developer with a focus on smart contracts,
        DeFi, and web3 solutions.
      </Typography>
    </Box>
  );
}

export default About;
