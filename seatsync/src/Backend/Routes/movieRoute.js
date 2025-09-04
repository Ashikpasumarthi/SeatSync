const express = require('express');
const router = express.Router();
const {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} = require('../Controllers/movieController');

const {getShowtimesByMovieId} = require('../Controllers/showtimeController');

router.post('/', createMovie);          // Handles POST to /api/movies
router.get('/', getAllMovies);         // Handles GET to /api/movies
router.get('/:id', getMovieById);      // Handles GET to /api/movies/:id
router.put('/:id', updateMovie);       // Handles PUT to /api/movies/:id
router.delete('/:id', deleteMovie);    // Handles DELETE to /api/movies/:id
router.get('/:movieId/showtimes', getShowtimesByMovieId);
module.exports = router;