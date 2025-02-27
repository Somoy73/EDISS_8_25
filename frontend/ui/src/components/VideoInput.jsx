import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";

export default function VideoInput(props) {
  const { width, height } = props;
  const [source, setSource] = useState(null);
  const [wsResponses, setWsResponses] = useState([]); // holds responses from WebSocket
  const wsRef = useRef(null);
  const websocket_url = "ws://localhost:8000/ws";
  const test_ws_url = "ws://localhost:8000/ws/image"

  // Establish a WebSocket connection on mount
  useEffect(() => {
    const ws = new WebSocket(websocket_url);
    // const ws = new WebSocket(test_ws_url);
    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onmessage = (message) => {
      console.log("Received:", message.data);
      // Assuming the server returns JSON-formatted data:
      const parsedData = JSON.parse(message.data);
      setWsResponses((prev) => [...prev, parsedData]);
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.onclose = () => {
      console.log("WebSocket closed");
    };
    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
    processVideo(url);
  };

  const processVideo = (videoUrl) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.play();

    video.onloadedmetadata = () => {
      const duration = video.duration;
      const chunkDuration = 0.5; // 500ms per frame
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas and video dimensions
      canvas.width = width;
      canvas.height = height;
      video.width = width;
      video.height = height;

      let currentTime = 0;

      const captureFrame = () => {
        video.currentTime = currentTime;
      };

      video.onseeked = () => {
        // Capture the frame into the canvas and convert to Base64
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg");

        // Send frame data to the WebSocket if the connection is open
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: "frame", data: base64 }));
        }

        if (currentTime + chunkDuration < duration) {
          currentTime += chunkDuration;
          captureFrame();
        }
      };

      captureFrame();
    };
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <IconButton
        component="label"
        sx={{
          marginBottom: "12px",
          marginLeft: "10px",
          marginTop: source ? "0" : "100px",
          color: "#559c8b",
          backgroundColor: "#559c8b10",
          "&:hover": { background: "#559c8b70" },
        }}
      >
        <FileUploadOutlined sx={{ fontSize: source ? "40px" : "60px" }} />
        <input
          type="file"
          accept=".mov,.mp4"
          hidden
          onChange={handleFileChange}
        />
      </IconButton>
      <Typography variant="sm" sx={{ width: "auto", fontSize: source ? "16px" : "22px" }}>
        {source ? "Select a new video" : "Choose a video to process"}
      </Typography>

      {source && (
        <Box sx={{ margin: "25px auto", display: "flex", justifyContent: "center" }}>
          <video className="VideoInput_video" height={height} controls src={source} />
        </Box>
      )}

{/* Only geenrate first image for debugging */}
{/* {wsResponses.length > 0 && (
  <Box sx={{ marginTop: "20px", width: "80%" }}>
    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
      Detection Result:
    </Typography>
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={wsResponses[0].image}
        alt="Detection Result"
        style={{ maxWidth: "100%" }}
      />
    </Box>
  </Box>
)} */}

{/* Testing generated image from detection */}
{wsResponses.length > 0 && (
        <Box sx={{ marginTop: "20px", width: "80%" }}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Detection Result:
            </Typography>
              {wsResponses.map((response, index) => (
                <Box
                key={index}               
                sx={{
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
              }}
            >
              <img 
                src={response.image}
                alt={`response-${index}`}
                style={{ maxWidth: "100%" }}
              />
            </Box>
          ))}
        </Box>
      )}

    </Box>
  );
}
