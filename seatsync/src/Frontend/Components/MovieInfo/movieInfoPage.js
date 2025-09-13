import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import { fetchMovieById } from '../../Slices/movieSlice'; // Import the new thunk
import { fetchShowTimes } from '../../Slices/showTimeSlice';
import { Box } from "@mui/material";
import { Button } from '@mui/material';
export default function MovieInfoPage() {

    const { slug, id } = useParams();
    const navigate = useNavigate();
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
                aspectRatio: '21 / 9',
                backgroundRepeat: 'no-repeat',
                backgroundFill: 'contain',
            } } src={ `${bannerURL}` } alt={ title } />
            <Box style={ { padding: '1rem', color: 'black' } } display={ 'flex' } alignItems={ 'center' } flexDirection={ 'column' } >
                { showtimes && (
                    showtimes.map((showtime, index) => (
                        <Box display={ 'flex' } flexDirection={ 'row' } alignItems={ 'center' } justifyContent={ 'center' } gap={ '3rem' } width={ '55%' } backgroundColor={ 'white' } padding={ '1rem 2rem' } borderBottom={ `${index === showtimes.length - 1 ? 'none' : '0.1rem solid rgb(208, 213, 230)'}` }>
                            <Box style={ {
                                alignSelf: 'start',
                                width: '17rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            } }>
                                <h6 alignSelf={ 'flexStart' }>{ showtime.auditorium.venue.name }</h6>
                                <p alignSelf={ 'flexStart' }>{ showtime.auditorium.venue.address }</p>
                            </Box>
                            <Box sx={ { width: '75%', padding: '0 1rem' } } >
                                <Button style={ {
                                    width: '16%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'rgb(102, 102, 102)',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    letterSpacing: '0.2px',
                                    border: '0.1rem solid rgb(64, 212, 97)',
                                    padding: '0.2rem 1.4rem',
                                    boxShadow: '-0.2rem 0rem rgb(64, 212, 97)',
                                    cursor: 'pointer',

                                } } variant="outlined" onClick={ (event) => { event.stopPropagation(); navigate(`/booking/${showtime._id}`) } }>
                                    { showtime.startTime.split('T')[1].split('.')[0].split(':')[0] > 12 ? (showtime.startTime.split('T')[1].split('.')[0].split(':')[0] - 12) + ':' + showtime.startTime.split('T')[1].split('.')[0].split(':')[1] + ' PM' : (showtime.startTime.split('T')[1].split('.')[0].split(':')[0]) + ':' + showtime.startTime.split('T')[1].split('.')[0].split(':')[1] + ' AM' }</Button>
                            </Box>
                        </Box>
                    ))
                ) }


            </Box>

        </Box >

    );
}