import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D75878",
    },
    secondary: {
      main: "#FEFCFC",
    },
    text: {
      primary: "#FEFCFC",
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
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
