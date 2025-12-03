import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchShowtimeById, holdingSeats } from '../../Slices/showTimeSlice';
import { Box, CircularProgress } from '@mui/material';
import { createBooking } from '../../Slices/bookingSlice';
import { resetBookingStatus, setShowErrorModal } from '../../Slices/bookingSlice';
import './seat.css';
import io from "socket.io-client";
import PopUp from '../popUp';

export default function SeatingPage() {
    const [seatSelected, setSeatSelected] = useState({ seatNumber: [] });
    const [seatSelectedByOthers, setSeatSelectedByOthers] = useState({ otherSeatNumber: [] });
    const [seatCategories, setSeatCategories] = useState([]);
    const { showtimeId } = useParams();
    const [newSocket, setNewSocket] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showErrorModal = useSelector((state) => state.booking.showErrorModal);
    const selectedShowtime = useSelector((state) => state.showTime.selectedShowtime);
    const bookingStatus = useSelector((state) => state.booking.status);
    const status = useSelector((state) => state.showTime.selectedShowtimeStatus);
    const bookedSeats = selectedShowtime?.bookedSeats || [];
    const shows = useSelector((state) => state.showTime.showTimes);

    useEffect(() => {
        // 1. Initialize the socket
        const socket = io("http://localhost:5000"); // Use http:// explicitly

        // 2. Set up the listener using the local 'socket' variable
        // Note: Client event is "connect", not "connection"
        setNewSocket(socket);
        socket.on('message', message => {
            console.log(message);
        });
        socket.on("connect", () => {
            console.log("Connected with ID:", socket.id);
            socket.emit("Join_room", showtimeId)
        });

        socket.on("otherSelection", (seatData) => {
            setSeatSelectedByOthers((prev) => {
                if (prev.otherSeatNumber.includes(seatData)) {
                    return { ...prev, otherSeatNumber: prev.otherSeatNumber.filter((s) => s !== seatData) };
                }
                else {
                    return { ...prev, otherSeatNumber: [...prev.otherSeatNumber, seatData] };
                }
            });

        });
        socket.on("seats_booked", () => {

            dispatch(fetchShowtimeById(showtimeId));

        });
        // 3. Save to state (if you need it elsewhere)


        // 4. Cleanup
        return () => {
            socket.disconnect();
        }
    }, [showtimeId, dispatch]);
    console.log("Booked Seats:", bookedSeats);

    useEffect(() => {
        if (showtimeId) {
            dispatch(fetchShowtimeById(showtimeId));
        }
    }, [showtimeId, dispatch]);
    const seatLayout = selectedShowtime?.auditorium?.seatLayout;


    useEffect(() => {
        if (!seatLayout) return;
        const categories = new Set();
        seatLayout.forEach(row => {
            row.forEach(seat => {
                if (!categories.has(seat.seatType)) {
                    categories.add(seat.seatType);
                }
            })
        })
        setSeatCategories(Array.from(categories));
    }, [seatLayout])



    function handleSeatSelect(seat) {
        if (seatSelected.seatNumber.includes(seat.seatNumber) === false) {
            setSeatSelected((prev) => ({ ...prev, seatNumber: [...prev.seatNumber, seat.seatNumber] }));
        }

        if (seatSelected.seatNumber.includes(seat.seatNumber) === true) {
            setSeatSelected((prev) => ({ ...prev, seatNumber: seatSelected.seatNumber.filter(s => s !== seat.seatNumber) }));
        }

        if (newSocket) {
            newSocket.emit("seat", {
                showTimeId: showtimeId,
                seatNumber: seat.seatNumber
            });
        }
    }

    let totalCost = useMemo(() => {
        if (!selectedShowtime) return 0;

        const allSeats = seatLayout.flat();
        return seatSelected.seatNumber.reduce((acc, seatNum) => {
            const seat = allSeats.find(s => s.seatNumber === seatNum);

            // Safety check in case the seat isn't found
            if (!seat || !seat.price) {
                return acc;
            }

            const price = Number(seat.price.replace(/\D+/g, ""));
            return acc + price;
        }, 0);
    }, [seatSelected, selectedShowtime, seatLayout]);

    function handleBooking() {
        console.log("clicked the submit button");
        if (seatSelected.seatNumber.length === 0) {
            window.alert("Please select at least one seat to proceed.");
            return;
        }
        let proceedBooking = window.confirm("Can we proceed for booking ?");



        if (proceedBooking === true) {


            dispatch(holdingSeats({
                showtimeId: showtimeId,
                seats: seatSelected.seatNumber
            }))

            const seatIsAlreadyHeld = seatSelected.seatNumber?.some(seatNum => shows.heldSeats.includes(seatNum));
            console.log("Seat held check", seatIsAlreadyHeld);
            if (!seatIsAlreadyHeld) {
                dispatch(createBooking({
                    movieName: selectedShowtime.movie.title,
                    venue: selectedShowtime.auditorium.venue.name,
                    screen: selectedShowtime.auditorium.name,
                    showTimeId: showtimeId,
                    seats: seatSelected.seatNumber,
                    totalAmount: totalCost
                }));
            }
            else {
                dispatch(setShowErrorModal(true));
            }



        }
    }

    useEffect(() => {
        if (bookingStatus === "succeeded") {
            alert("Booking Successful!");
            navigate('/');
            dispatch(resetBookingStatus());
        }
    }, [bookingStatus, dispatch, navigate])


    if (status === 'loading' || !selectedShowtime) {
        return (
            <Box sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } }>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            { showErrorModal && (
                <PopUp />
            ) }
            <div className='w-full min-h-screen bg-gray-50 p-4'>
                <div className='max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6'>
                    <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800">{ selectedShowtime.movie.title }</h1>
                    <p className="text-center text-gray-600 mb-6">{ selectedShowtime.auditorium.venue.name } - { selectedShowtime.auditorium.name }</p>

                    <div className='mb-6 flex justify-center'>
                        <div className='flex flex-col min-w-max'>
                            { seatLayout.map((row, rowIndex) => (
                                <div key={ `${String.fromCharCode(65 + rowIndex)}` } className={ `flex flex-row items-center ${rowIndex === 0 ? "lg:gap-[16.5rem]" : (rowIndex === seatLayout.length - 1 ? 'lg:gap-[8.7rem]' : null)}` } >
                                    <h5 className='flex flex-start w-8 text-center '>{ String.fromCharCode(65 + rowIndex) }</h5>
                                    <div className='flex flex-row items-center mb-1 w-full'>
                                        {
                                            row.map((seat) => {
                                                return (
                                                    seat.type === 'seat' ? (<div key={ seat._id } className={ `w-8 h-8 sm:w-10 sm:h-10 lg:w-[1.6rem] lg:h-[1.6rem] m-1 rounded-t-lg border-2 cursor-pointer transition-all duration-20 flex items-center justify-center text-xs sm:text-sm font-bold bolder-blue-300 text-blue-800 hover:bg-blue-300 ${seatSelected.seatNumber.includes(seat.seatNumber)
                                                        ? 'bg-green-600 text-white border-green-800 hover:bg-green-700' : bookedSeats.includes(seat.seatNumber) ? 'text-red-800 border-red-500 bg-red-600 pointer-events-none' : seatSelectedByOthers.otherSeatNumber.includes(seat.seatNumber)
                                                            ? 'bg-orange-500 text-white border-orange-700 hover:bg-orange-600 animate-pulse'
                                                            : `${seat.seatType === "Gold" ? "bg-yellow-200 border-yellow-400 text-yellow-800" : seat.seatType === "Platinum" ? "bg-purple-200 border-purple-400 text-purple-800" : "bg-sky-200 border-sky-400 text-sky-800"}`}` } onClick={ () => { handleSeatSelect(seat) } }>
                                                        { seat.seatNumber.replace(/\D+/g, "") }
                                                    </div>
                                                    ) : (<div key={ seat._id || `aisle-${rowIndex}-${Math.random().toString(36).slice(2, 7)}` } className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-1'> </div>)
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                    <div className='w-full max-w-[70rem] h-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full'><span className='flex justify-center text-white'>All eyes this way please</span></div>
                    <div className='w-full max-w-[70rem] flex flex-row gap-3 justify-center items-center mt-6 bg-gray-100 mx-auto rounded-full pt-3 pb-3'>
                        {
                            seatCategories.map((category) => {
                                return (<div key={ category } className='flex flex-row justify-center items-center space-x-2'>
                                    <div className={ `w-6 h-6 rounded-t-lg border-2 ${category === "Gold" ? "bg-yellow-200 border-yellow-400" : category === "Platinum" ? "bg-purple-200 border-purple-400" : "bg-sky-200 border-sky-400"}` }></div>
                                    <span className='text-gray-700 font-medium'>{ category } </span>
                                </div>
                                )

                            })

                        }
                        <div key="selected" className='flex flex-row justify-center items-center space-x-2'>
                            <div className="w-6 h-6 rounded-t-lg border-2 bg-green-600 border-green-800" ></div>
                            <span className='text-green-700 font-medium'>Selected</span>
                        </div>
                        <div key="selected" className='flex flex-row justify-center items-center space-x-2'>
                            <div className="w-6 h-6 rounded-t-lg border-2 bg-red-600 border-red-800" ></div>
                            <span className='text-red-700 font-medium'>Booked</span>
                        </div>
                    </div>
                </div>
            </div >

            {
                seatSelected.seatNumber.length > 0 &&

                <div className='bottom-4 mb-5 bg-gray-100 p-3 rounded-lg shadow-lg'>
                    <h6 className='font-bold text-2xl'>Booking Summary :</h6>
                    <p className='font-semibold'>Selected Seats: { seatSelected.seatNumber.join(", ") }</p>
                    <p>Sub Total : Rs { totalCost }</p>
                </div>

            }


            { seatSelected.seatNumber.length > 0 &&
                <div className='flex justify-center items-center bottom-4 left-0 right-0 mx-auto w-full bg-white p-2 rounded-lg shadow-lg space-x-2 border-gray-100'>
                    <button type="button" className='bg-purple-600 flex justify-center font-bold text-white px-3 pt-3 pb-3 rounded-lg hover:bg-purple-700 w-[15rem]' onClick={ handleBooking }>Book Tickets</button>
                </div>
            }

        </>

    );
}








// <Box sx={ { textAlign: 'center', marginTop: '2rem', backgroundColor: 'black' } }>
//     <Typography variant="h4">{ selectedShowtime.movie.title }</Typography>
//     <Typography variant="h6">{ selectedShowtime.auditorium.venue.name } - { selectedShowtime.auditorium.name }</Typography>

//     <Box>
//         { seatLayout.map((row, rowIndex) => (
//             <Box key={ rowIndex } sx={ { display: 'flex', justifyContent: 'center' } }>
//                 { row.map((seat, seatIndex) => (
//                     <Box key={ seat.seatNumber || `aisle-${seatIndex}` } sx={ { margin: '4px' } } >
//                         { seat.type === 'seat' ? (
//                             // <MdEventSeat size={ 30 } color="green" />
//                             // <FontAwesomeIcon icon={ faChair } style={ { backgroundColor: 'ghostwhite !important' } } />
//                             <Box key={ seatIndex } sx={ {
//                                 width: '35px',
//                                 height: '35px',
//                                 backgroundColor: '#4a4a4a',
//                                 color: 'white',
//                                 borderRadius: '5px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 margin: '4px',
//                                 cursor: 'pointer',
//                                 '&:hover': {
//                                     backgroundColor: '#6c6c6c',
//                                 }
//                             } }>{ seatIndex + 1 }</Box>
//                         ) : (
//                             <Box sx={ { width: '30px', height: '30px' } } />
//                         ) }
//                     </Box>
//                 )) }
//             </Box>
//         )) }
//     </Box>
// </Box>