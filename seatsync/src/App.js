import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";

const theme = createTheme();

function App() {
  // Select only what you need
  const movieList = useSelector(state => state.movies.movieList);

  useEffect(() => {
    console.log("App component rendered, movieList:", movieList); //this will render the App component whenever movieList changes
  }, [movieList]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={ theme }>

        <Outlet />

      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
