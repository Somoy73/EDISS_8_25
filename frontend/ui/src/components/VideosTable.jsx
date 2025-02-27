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

import { useData } from "../hooks/DataContext";

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
  const { data } = useData();
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Video Analysis Logs{" "}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#559c8b" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontSize: "16px" }}>
                <b>Index</b>
              </TableCell>
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
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.timestamp}</TableCell>

                <TableCell>Processed ✅</TableCell>
                <TableCell>
                  {row.danger
                    ? "Danger 🚨 Misuse Of Company Equipment Detected ⚠️"
                    : "Correct ✅ Usage of Company Detected 👍"}
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <VideoTableDialog danger={row.danger} time={row.timestamp} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" sx={{ marginTop: "20px" }}>
        {data.filter((row) => row.danger).length > 0
          ? ` ⚠️ There are ${
              data.filter((row) => row.danger).length
            } instance(s) of misuse of company equipment detected. ⚠️`
          : "No misuse of company equipment has been detected. ✅"}
      </Typography>
    </>
  );
};

export default VideosTable;
