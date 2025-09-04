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

const showtimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        showTimes: [],

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
            });
    }
})

export default  showtimeSlice.reducer;
export { fetchShowTimes };