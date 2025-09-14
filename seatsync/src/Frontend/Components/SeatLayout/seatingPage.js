import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchShowtimeById } from '../../Slices/showTimeSlice';
// import { MdEventSeat } from "react-icons/md";
// import { faChair } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, CircularProgress, Typography } from '@mui/material';
import './seat.css';

export default function SeatingPage() {
    const { showtimeId } = useParams();
    const dispatch = useDispatch();

    const selectedShowtime = useSelector((state) => state.showTime.selectedShowtime);
    const status = useSelector((state) => state.showTime.selectedShowtimeStatus);

    useEffect(() => {
        if (showtimeId) {
            dispatch(fetchShowtimeById(showtimeId));
        }
    }, []);
    const seatLayout = selectedShowtime?.auditorium?.seatLayout;

    if (status === 'loading' || !selectedShowtime) {
        return (
            <Box sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } }>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={ { textAlign: 'center', marginTop: '2rem', backgroundColor: 'black' } }>
            <Typography variant="h4">{ selectedShowtime.movie.title }</Typography>
            <Typography variant="h6">{ selectedShowtime.auditorium.venue.name } - { selectedShowtime.auditorium.name }</Typography>

            <Box>
                { seatLayout.map((row, rowIndex) => (
                    <Box key={ rowIndex } sx={ { display: 'flex', justifyContent: 'center' } }>
                        { row.map((seat, seatIndex) => (
                            <Box key={ seat.seatNumber || `aisle-${seatIndex}` } sx={ { margin: '4px' } } >
                                { seat.type === 'seat' ? (
                                    // <MdEventSeat size={ 30 } color="green" />
                                    // <FontAwesomeIcon icon={ faChair } style={ { backgroundColor: 'ghostwhite !important' } } />
                                    <Box key={ seatIndex } sx={ {
                                        width: '35px',
                                        height: '35px',
                                        backgroundColor: '#4a4a4a',
                                        color: 'white',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '4px',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#6c6c6c',
                                        }
                                    } }>{ seatIndex + 1 }</Box>
                                ) : (
                                    <Box sx={ { width: '30px', height: '30px' } } />
                                ) }
                            </Box>
                        )) }
                    </Box>
                )) }
            </Box>
        </Box>
    );
}