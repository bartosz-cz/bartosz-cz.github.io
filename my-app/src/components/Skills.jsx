import React from "react";
import { Box, Typography, Chip } from "@mui/material";

function Skills() {
  const skills = [
    "Solidity",
    "Web3.js / Ethers.js",
    "React.js",
    "Node.js",
    "Hardhat / Truffle",
    "Smart Contract Development",
    "IPFS",
    "Docker",
    "Git & GitHub",
  ];

  return (
    <Box sx={{ marginTop: 8, textAlign: "center" }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Skills
      </Typography>
      {skills.map((skill, index) => (
        <Chip key={index} label={skill} variant="outlined" sx={{ margin: 1 }} />
      ))}
    </Box>
  );
}

export default Skills;
