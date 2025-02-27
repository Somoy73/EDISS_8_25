import React from "react";
import { Grid, Box } from "@mui/material";
import Good1 from "../images/good1.jpeg";
import Good2 from "../images/good2.jpeg";
import Good3 from "../images/good3.jpeg";
import Bad1 from "../images/bad1.jpeg";
import Bad2 from "../images/bad2.jpeg";
import Bad3 from "../images/bad3.jpeg";

const Gallery = (props) => {
  const [goodImg, setGoodImg] = React.useState([Good1, Good3, Good1]);
  const [badImg, setBadImg] = React.useState([Bad1, Bad2, Bad1]);
  return (
    <Box
      sx={{
        width: "95%",
        boxSizing: "border-box",
        // Adjust height as needed
        overflowY: "auto",
        margin: "0 auto", // Enable vertical scrolling
      }}
    >
      <Grid container spacing={2}>
        {props.danger
          ? badImg.map((src, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <img
                  src={src}
                  alt={`Video Thumbnail ${index + 1}`}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Grid>
            ))
          : goodImg.map((src, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <img
                  src={src}
                  alt={`Video Thumbnail ${index + 1}`}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
