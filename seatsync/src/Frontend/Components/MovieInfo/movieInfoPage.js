import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import { fetchMovieById } from '../../Slices/movieSlice'; // Import the new thunk
import { fetchShowTimes } from '../../Slices/showTimeSlice';
import { Box } from "@mui/material";

export default function MovieInfoPage() {

    const { slug, id } = useParams();
    console.log("Slug and MovieId:", slug, id);
    const dispatch = useDispatch();
    // const movie = useSelector((state) => state.movies.selectedMovie);
    // console.log("Selected Movie:", movie);
    const showtimes = useSelector((state) => state.showTime.showTimes);
    console.log("Showtimes:", showtimes);
    const movieStatus = useSelector((state) => state.movies.status);
    console.log("Movie Status:", movieStatus);
    console.log(showtimes)
    useEffect(() => {
        dispatch(fetchShowTimes(id));
    }, [dispatch, id]);

    let bannerURL = showtimes.length > 0 && showtimes[0].movie.bannerURL;
    let title = showtimes.length > 0 && showtimes[0].movie.title;

    if (movieStatus === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <Box style={ { position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'black' } }>
            <img style={ {

                width: '100vw',
                height: '45%',

                position: 'static',
                aspectRatio: '16 / 9',
                backgroundRepeat: 'no-repeat',
                backgroundFill: 'contain',



            } } src={ `${bannerURL}` } alt={ title } />

        </Box>

    );
}