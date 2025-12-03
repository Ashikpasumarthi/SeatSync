// import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useSelector } from "react-redux";

const theme = createTheme();

function App() {

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={ theme }>

        <Outlet />

      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
