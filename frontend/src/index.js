import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  type: 'success',
  transition: transitions.SCALE
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#D75878",
    },
    secondary: {
      main: "#FEFCFC",
    },
    text: {
      primary: "#e7a2b4",
      secondary: "#FEFCFC",
    },
    background: {
      paper: "#030303",
    },

    light: "#6c146c",
    mode: "dark",
  },
});

ReactDOM.render(
<AlertProvider template={AlertTemplate} {...options}>
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>
  </AlertProvider>
,

  document.getElementById("root")
);
