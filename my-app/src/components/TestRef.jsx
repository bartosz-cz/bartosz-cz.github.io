import React, { useRef, useLayoutEffect } from "react";
import { Box } from "@mui/material";

export default function TestRef() {
  const ref = useRef < HTMLDivElement > null;

  useLayoutEffect(() => {
    console.log("TestRef mounted, ref.current =", ref.current);
  }, []);

  return (
    <Box ref={ref} component="div" sx={{ background: "red", height: 200 }}>
      TestRef Box
    </Box>
  );
}
