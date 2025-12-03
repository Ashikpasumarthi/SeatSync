import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createBooking = createAsyncThunk("movie/booking", async (data, thunkAPI) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/bookings/`, data);
        console.log("Booking Response:", response);
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch booking details");
    }
});

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        status: 'idle',
        error: null,
        showErrorModal: false,
    },
    reducers: {
        resetBookingStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },

        setShowErrorModal: (state) => {
            state.showErrorModal = true;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(createBooking.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(createBooking.fulfilled, (state) => {
            state.status = 'succeeded';
        });

        builder.addCase(createBooking.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || 'Failed to create booking';
        }
        );
    }
});

export const { resetBookingStatus, setShowErrorModal} = bookingSlice.actions;

export default bookingSlice.reducer;
