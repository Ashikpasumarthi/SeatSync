import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const fetchShowTimes = createAsyncThunk(
    'showTime/fetchByMovie',
    async (id, { rejectWithValue }) => {
        try {
            // Call the specific endpoint for one movie's showtimes
            const response = await axios.get(`http://localhost:5000/api/v1/movies/${id}/showtimes`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchShowtimeById = createAsyncThunk(
    'showTime/fetchById',
    async (showtimeId, { rejectWithValue }) => {
        try {
            console.log("Fetching showtime with ID:", showtimeId);
            const response = await axios.get(`http://localhost:5000/api/v1/showtimes/${showtimeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const holdingSeats = createAsyncThunk(
    'showTime/holdingSeats',
    async ({ showtimeId, seats }, { rejectWithValue }) => {
        try {
            console.log("Fetching showtime with ID:", showtimeId);
            const response = await axios.post(`http://localhost:5000/api/v1/showtimes/${showtimeId}/hold`, { seats });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// export const BookedSeat = createAsyncThunk('showTime/BookedSeat', async (showtimeId, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`http://localhost:5000/api/v1/showtimes/${showtimeId}`);
//         return response.data;
//     }
//     catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// })

const showtimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        showTimes: [],
        selectedShowtime: null,
        status: 'idle',
        selectedShowtimeStatus: 'idle',
        error: null,
        seatHold : 'idle'
    },
    extraReducers: (builder) => {
        builder.addCase(fetchShowTimes.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchShowTimes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.showTimes = action.payload;
            })
            .addCase(fetchShowTimes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchShowtimeById.pending, (state) => {
                state.selectedShowtimeStatus = 'loading';
            })
            .addCase(fetchShowtimeById.fulfilled, (state, action) => {
                state.selectedShowtimeStatus = 'succeeded';
                state.selectedShowtime = action.payload; // Updates the new state
            })
            .addCase(fetchShowtimeById.rejected, (state, action) => {
                state.selectedShowtimeStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(holdingSeats.pending, (state) => {
                // Use the specific status for the seating page
                state.seatHold = 'loading';
                state.error = null; // Clear any previous errors
            })
            .addCase(holdingSeats.fulfilled, (state, action) => {
                // The hold was successful! Update the status and proceed.
                state.seatHold = 'succeeded';
            })
            .addCase(holdingSeats.rejected, (state, action) => {
                // This is the trigger for the 'Inconvenience Popup'
                state.seatHold = 'failed';
                state.error = action.payload ? action.payload.message : 'Hold failed due to conflict.';
            });
    }
})

export default showtimeSlice.reducer;
export { fetchShowTimes };