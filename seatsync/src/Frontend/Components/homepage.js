import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMovies } from "../Slices/movieSlice";
import Box from '@mui/material/Box';
import SwiperComponent from "../Components/SwiperComponent/swiper";
import { createTheme } from "@mui/material";

export default function Homepage() {
      // Select only what you need
      const movieList = useSelector(state => state.movies.movieList);
    
      useEffect(() => {
        console.log("App component rendered, movieList:", movieList); //this will render the App component whenever movieList changes
      }, [movieList]);
    
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 769,
                lg: 1024,
                xl: 1536,
            },
        },
    })
    // const movieList = useSelector(state => state.movies.movieList);
    console.log("HomePage data", movieList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMovies())
    }, [dispatch])
    return (
        <Box spacing={ 2 } display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={ 2 } sx={ { background:'black',height: '100vh', [theme.breakpoints.between('xs', 'sm')]: { padding: '0 1rem' }, [theme.breakpoints.between('sm', 'md')]: { padding: '0 2rem' }, } }>
            { Array.isArray(movieList) && movieList ? (
                <SwiperComponent movieList={ movieList } />
            ) : (
                <p>Loading...</p>
            ) }
        </Box>
    )
}
