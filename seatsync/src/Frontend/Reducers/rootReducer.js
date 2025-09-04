
import movieReducer from '../Slices/movieSlice';
import showtimeReducer from '../Slices/showTimeSlice';

const reducerMappings = {
    movies: movieReducer,
    showTime: showtimeReducer,
}

export default reducerMappings;