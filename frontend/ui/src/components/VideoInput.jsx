import React, { useEffect } from "react";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { FileUploadOutlined } from "@mui/icons-material";

import { Button, Typography } from "@mui/material";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();
  const [chuckArray, setChuckArray] = React.useState();
  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);

    let currentChunkArr = processVideo(url);
    setChuckArray(currentChunkArr);
  };

  const handleOnProcess = () => {
    console.log(chuckArray);
  };

  const processVideo = (videoUrl) => {
    let chuncks = [];
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.play();

    video.onloadedmetadata = () => {
      const duration = video.duration;
      const chunkDuration = 0.5; // 500ms

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      video.width = canvas.width = width; // Set canvas size
      video.height = canvas.height = height;

      let currentTime = 0;

      const captureFrame = () => {
        video.currentTime = currentTime;
      };

      video.onseeked = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg"); // Convert to Base64

        // Process the Base64 chunk (e.g., send to backend or store)
        chuncks.push(base64);

        if (currentTime + chunkDuration < duration) {
          currentTime += chunkDuration;
          captureFrame();
        }
      };

      captureFrame();
    };
    return chuncks;
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <IconButton
          component="label"
          sx={{
            marginBottom: "12px",
            marginLeft: "10px",
            marginTop: source ? "0" : "100px",
            color: "#559c8b",
            backgroundColor: "#559c8b10",
            "&:hover": {
              background: "#559c8b70",
            },
          }}
        >
          <FileUploadOutlined
            sx={{
              fontSize: source ? "40px" : "60px",
            }}
          />
          <input
            styles={{ display: "none" }}
            type="file"
            accept=".mov,.mp4"
            hidden
            onChange={handleFileChange}
          />
        </IconButton>
        <Typography
          variant="sm"
          sx={{ width: "auto", fontSize: source ? "16px" : "22px" }}
        >
          {source ? "Select a new video" : "Choose a video to process"}
        </Typography>
      </Box>

      {source && (
        <Box
          sx={{
            margin: "25px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <video
            className="VideoInput_video"
            height={height}
            controls
            src={source}
          />
        </Box>
      )}

      <Box sx={{ width: "100%" }}>
        {chuckArray && (
          <Button
            onClick={handleOnProcess}
            sx={{
              backgroundColor: "#599c8b",
              color: "white",
              padding: "10px 20px",
              margin: "0 auto",
              display: "block",
              fontWeight: "bold",
            }}
          >
            Process Video
          </Button>
        )}
      </Box>
    </>
  );
}
