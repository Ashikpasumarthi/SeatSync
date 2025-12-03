
import movieReducer from '../Slices/movieSlice';
import showtimeReducer from '../Slices/showTimeSlice';
import bookingReducer from '../Slices/bookingSlice';

const reducerMappings = {
    movies: movieReducer,
    showTime: showtimeReducer,
    booking: bookingReducer
}

export default reducerMappings;