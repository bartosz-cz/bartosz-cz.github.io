import React, { useState, useEffect, useRef } from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";

export default function SkillWall({
  headerlHeight,
  skillWallRef,
  skillWallWidth,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const containerRef = useRef(null);
  const [skillWidth, setSkillWidth] = useState(120);
  const [skillRows, setSkillRows] = useState([]);
  const allSkills = [
    { label: "Solidity", url: "https://soliditylang.org" },
    { label: "Blockchain", url: "https://ethereum.org" },
    {
      label: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    { label: "Hedera", url: "https://hedera.com" },
    { label: "DApps", url: "https://ethereum.org/en/developers/docs/dapps/" },
    {
      label: "Contracts",
      url: "https://ethereum.org/en/developers/docs/smart-contracts/",
    },
    { label: "React", url: "https://react.dev" },
    { label: "Git", url: "https://git-scm.com" },
    { label: "Node.js", url: "https://nodejs.org" },
    { label: "TypeScript", url: "https://www.typescriptlang.org" },
    { label: "Docker", url: "https://www.docker.com" },
    { label: "GitHub", url: "https://github.com" },
    { label: "GitLab", url: "https://gitlab.com" },
    { label: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { label: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    {
      label: "CRYPTOGRAPHY",
      url: "https://en.wikipedia.org/wiki/Cryptography",
    },
  ];

  const skillHeight = 60;
  const calculateSkills = () => {
    const skillWidth = Math.max(Math.round(window.innerWidth / 8), 140);
    setSkillWidth(skillWidth);
    const cumulativeWidth = allSkills.length * skillWidth;
    console.log(cumulativeWidth);
    const height = containerRef.current?.offsetHeight || window.innerHeight;
    console.log(height);
    const availableHeight = window.innerHeight - headerlHeight * 1.3;
    const maxRowCount = Math.floor(availableHeight / skillHeight);
    const RowCount = Math.min(
      Math.floor(cumulativeWidth / window.innerWidth),
      maxRowCount
    );
    let rows = [];
    for (let i = 0; i < RowCount.length; i++) {
      rows.push(i);
    }

    const DontFit = Math.floor(
      (cumulativeWidth - RowCount * window.innerWidth) / skillWidth
    );
    const fitSkills = allSkills.slice(0, allSkills.length - DontFit);
    console.log("fit " + fitSkills);
    console.log("counbt " + RowCount);

    const skillPerRow_ = Math.floor(fitSkills.length / RowCount);
    console.log("skillPerRow_ " + skillPerRow_);
    const skillRows = [];
    for (let i = 0; i < fitSkills.length; i += skillPerRow_) {
      if (fitSkills.length - i >= skillPerRow_)
        skillRows.push(fitSkills.slice(i, i + skillPerRow_));
    }
    console.log("rows " + skillRows);
    setSkillRows(skillRows);
  };

  useEffect(() => {
    calculateSkills();
  }, [headerlHeight, skillWallWidth]);

  return (
    <Box
      ref={skillWallRef}
      sx={{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "auto",
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          pointerEvents: "none",
        }}
      >
        {skillRows.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              width: "100%",
              height: `${skillHeight}px`,
            }}
          >
            {row.map((skill) => (
              <Box
                key={skill.label}
                sx={{
                  flexGrow: 1,
                  flexBasis: 0,
                  minWidth: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "auto",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => window.open(skill.url, "_blank")}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 0,
                    fontWeight: "bold",
                    backgroundColor: theme.palette.background.paper,
                    color: "#414C55",
                    border: "none",
                    boxShadow: "none",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.stroke,
                      color: "#fff",
                    },
                  }}
                >
                  {skill.label}
                </Button>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
