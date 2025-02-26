import VideoInput from "./components/VideoInput";

import Button from "@mui/material/Button";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import CustomAppBar from "./components/CustomAppBar";
function App() {
  return (
    <>
      <CustomAppBar />

      {/* Main Content */}
      <Container sx={{ minHeight: "83vh", py: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: "10px" }}>
          Max Box Layers On Pellet{" "}
        </Typography>
        <VideoInput width={400} height={300} />
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", py: 2, bgcolor: "grey.200", mt: 3 }}>
        <Typography variant="body2">
          &copy; 2025 My App. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

export default App;
