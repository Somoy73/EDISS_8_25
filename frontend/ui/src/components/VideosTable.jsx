import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Icon,
} from "@mui/material";

import VideoTableDialog from "./VideoTableDialog";

// Sample data
const sampleData = [
  {
    date: "2025-02-20",
    status: "Completed",
    description: "Video on machine learning concepts.",
  },
  {
    date: "2025-02-18",
    status: "In Progress",
    description: "Video about cloud architecture.",
  },
  {
    date: "2025-02-15",
    status: "Pending",
    description: "Video on AI model deployment.",
  },
  {
    date: "2025-02-10",
    status: "Completed",
    description: "Video on quantum computing basics.",
  },
  {
    date: "2025-02-05",
    status: "In Progress",
    description: "Video on data pipelines.",
  },
];

const VideosTable = () => {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Max Box Layers On Pellet Logs{" "}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#559c8b" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontSize: "16px" }}>
                <b>Date</b>
              </TableCell>
              <TableCell sx={{ color: "white", fontSize: "16px" }}>
                <b>Status</b>
              </TableCell>
              <TableCell sx={{ color: "white", fontSize: "16px" }}>
                <b>Description</b>
              </TableCell>
              <TableCell sx={{ color: "white", fontSize: "16px" }}>
                <b></b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  {" "}
                  <VideoTableDialog />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VideosTable;
