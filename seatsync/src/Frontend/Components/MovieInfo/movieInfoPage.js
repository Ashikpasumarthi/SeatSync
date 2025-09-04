import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById } from '../../Slices/movieSlice'; // Import the new thunk
import { fetchShowtimesByMovieId } from '../../Slices/showTimeSlice';
import { Box } from "@mui/material";

export default function MovieInfoPage() {
    // Use 'movieId' to match your route: /movie/:slug/:movieId
    const { movieId } = useParams();
    const dispatch = useDispatch();

    // Select the single movie and the showtimes
    const movie = useSelector((state) => state.movies.selectedMovie);
    const showtimes = useSelector((state) => state.showTime.showTimes);
    const movieStatus = useSelector((state) => state.movies.status);

    useEffect(() => {
        if (movieId) {
            // Dispatch the actions to fetch data FOR THIS PAGE
            dispatch(fetchMovieById(movieId));
// I have commented below line as it is not needed now , but will uncomment when show details are needed
            // dispatch(fetchShowtimesByMovieId(movieId));
        }
    }, [dispatch, movieId]);

    if (movieStatus === 'loading' || !movie) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            {/* No more .find()! Just use the 'movie' object directly */}
            {movie.bannerUrl && (
                <img src={movie.bannerUrl} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
            )}
            {/* ... rest of your page to display showtimes */}
        </Box>
    );
}