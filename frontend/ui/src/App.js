import VideoInput from "./components/VideoInput";

import Button from "@mui/material/Button";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import CustomAppBar from "./components/CustomAppBar";
import { BrowserRouter, Routes, Route } from "react-router";
import VideosTable from "./components/VideosTable";
import { DataProvider } from "./hooks/DataContext.js";

function App() {
  return (
    <>
      <DataProvider>
        <CustomAppBar />

        {/* Main Content */}
        <Container sx={{ minHeight: "83vh", py: 3 }}>
          <Routes>
            <Route path="/" element={<VideoInput width="45%" />} />
            <Route path="/table" element={<VideosTable />} />
          </Routes>
        </Container>

        {/* Footer */}
        <Box sx={{ textAlign: "center", py: 2, bgcolor: "grey.200", mt: 3 }}>
          <Typography variant="body2">
            &copy; 2025 Aptar. All rights reserved.
          </Typography>
        </Box>
      </DataProvider>
    </>
  );
}

export default App;
