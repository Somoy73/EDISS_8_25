import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Fullscreen } from "@mui/icons-material";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Gallery from "../components/Gallery";
import { useData } from "../hooks/DataContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VideoTableDialog(props) {
  const [data, setData] = React.useState(useData());

  React.useEffect(() => {
    console.log(data);
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadFile = () => {
    const content = `"<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Aptar Company Equipment Use Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      width: 80%;
      margin: 0 auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    h1 {
      text-align: center;
      color: #333;
    }
    table {
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class='container'>
    <h1>Aptar Company Lift Fork Misuse Detection Report</h1>
    
    <h3>Report Summary</h3>
    <p>This report provides an overview of lift fork usage, highlighting detected misuse based on the machine learning model.</p>

    <table>
      <thead>
        <tr>
          <th>Forklift ID</th>
          <th>Operator ID</th>
          <th>Usage Duration</th>
          <th>Detected Misuse</th>
          <th>Confidence Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>LF001</td>
          <td>OP123</td>
          <td>4 hours</td>
          <td>Incorrect Load Position</td>
          <td>87%</td>
        </tr>
        <tr>
          <td>LF002</td>
          <td>OP124</td>
          <td>6 hours</td>
          <td>Excessive Speed</td>
          <td>92%</td>
        </tr>
        <tr>
          <td>LF003</td>
          <td>OP125</td>
          <td>5 hours</td>
          <td>Overloading</td>
          <td>95%</td>
        </tr>
        <tr>
          <td>LF004</td>
          <td>OP126</td>
          <td>7 hours</td>
          <td>Incorrect Load Position</td>
          <td>80%</td>
        </tr>
        <tr>
          <td>LF005</td>
          <td>OP127</td>
          <td>3 hours</td>
          <td>None Detected</td>
          <td>100%</td>
        </tr>
      </tbody>
    </table>

    <h3>Model Overview</h3>
    <p>The model analyzes the lift fork behavior using sensor data and operational logs. It detects anomalies such as incorrect load positions, overloading, and excessive speed.</p>

    <div class='footer'>
      <p>&copy; 2025 Aptar Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>"`;

    const blob = new Blob([content], { type: "text/html" }); // MIME type should be text/html
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob); // Create a URL for the blob
    link.download = "Lift_Fork_Misuse_Report.html"; // The name of the downloaded file
    link.click(); // Simulate click to start download
  };

  return (
    <React.Fragment>
      <Icon onClick={handleClickOpen}>
        <Fullscreen sx={{}} />
      </Icon>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#559c8b" }}>
          <Toolbar>
            <Typography sx={{ ml: 0, flex: 1 }} variant="h6" component="div">
              Details
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List sx={{ pl: "24px", mt: "20px" }}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Time of Incident: {props.time}
          </Typography>
        </List>
        <Gallery danger={props.danger} time={props.time}></Gallery>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button
            sx={{
              backgroundColor: "#559c8b",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              marginTop: "20px",
              width: "200px",
            }}
            onClick={downloadFile}
          >
            {" "}
            Download Report
          </Button>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
