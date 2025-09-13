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
            const response = await axios.get(`http://localhost:5000/api/v1/showtimes/${showtimeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const showtimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        showTimes: [],
        selectedShowtime: null,
        status: 'idle',
        error: null,
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
                state.status = 'loading';
            })
            .addCase(fetchShowtimeById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedShowtime = action.payload; // Updates the new state
            })
            .addCase(fetchShowtimeById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default showtimeSlice.reducer;
export { fetchShowTimes };