import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/movies');
        return response.data;
    } catch (error) {
        return rejectWithValue({ message: 'Failed to fetch movies' });
    }
});

export const fetchMovieById = createAsyncThunk(
    'movies/fetchById',
    async (movieId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/movies/${movieId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movieList: [],
        selectedMovie: null,
        loading: false,
        error: null
    },
    reducers: {
        setMovies: (state, action) => {
            state.movieList = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movieList = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchMovies.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
        // --- 3. Add cases for the NEW thunk to update 'selectedMovie' ---
        builder.addCase(fetchMovieById.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchMovieById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.selectedMovie = action.payload.data;
        })
        builder.addCase(fetchMovieById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload ? action.payload.message : 'Something went wrong';
        });
    }
});


export default movieSlice.reducer;
export { fetchMovies};
export const { setMovies, setLoading } = movieSlice.actions;