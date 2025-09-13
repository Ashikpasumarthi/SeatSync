import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {fetchShowtimeById} from '../../Slices/showTimeSlice';
import { MdEventSeat } from "react-icons/md";
import { Box, CircularProgress } from '@mui/material';

export default function SeatingPage() {
    const { showtimeId } = useParams();
    const dispatch = useDispatch();

    // Select the data AND the loading status from your slice
    const selectedShowtime = useSelector((state) => state.showTime.selectedShowtime);
    const status = useSelector((state) => state.showTime.status);

    useEffect(() => {
        if (showtimeId) {
            dispatch(fetchShowtimeById(showtimeId));
        }
    }, [dispatch, showtimeId]);
    const seatLayout = selectedShowtime?.auditorium?.seatLayout;
    // --- THIS IS THE CRUCIAL FIX ---
    // If the data is loading OR if the showtime object doesn't exist yet,
    // show a loading spinner and do not try to render the rest of the page.
    if (status === 'loading' || !selectedShowtime) {
        return (
            <Box sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } }>
                <CircularProgress />
            </Box>
        );
    }

    // // This code below will only run if 'showtime' is a valid object.
    // const seatLayout = selectedShowtime.auditorium.seatLayout;

    return (
        <Box sx={ { textAlign: 'center', marginTop: '2rem' } }>
            {/* <Typography variant="h4">{ selectedShowtime.movie.title }</Typography>
            <Typography variant="h6">{ selectedShowtime.auditorium.venue.name } - { selectedShowtime.auditorium.name }</Typography> */}

            <Box>
                { seatLayout.map((row, rowIndex) => (
                    <Box key={ rowIndex } sx={ { display: 'flex', justifyContent: 'center' } }>
                        { row.map((seat, seatIndex) => (
                            <Box key={ seat.seatNumber || `aisle-${seatIndex}` } sx={ { margin: '4px' } }>
                                { seat.type === 'seat' ? (
                                    <MdEventSeat size={ 30 } color="gray" />
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