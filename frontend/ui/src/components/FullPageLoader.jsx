import React from "react";
import { CircularProgress, Box } from "@mui/material";

const FullPageLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure it's on top of everything
      }}
    >
      <CircularProgress size={60} sx={{ color: "#559c8b" }} />
    </Box>
  );
};

export default FullPageLoader;
