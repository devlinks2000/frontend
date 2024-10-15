import React from "react";
import MainRoutes from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainRoutes />
      <ToastContainer />
      <CssBaseline />
    </ThemeProvider>
  );
}
