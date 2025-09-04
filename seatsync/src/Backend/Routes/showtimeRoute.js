const express = require('express');
const router = express.Router();
const {
    createShowtime,
    getAllShowtimes,
    getShowtimeById,
    updateShowtime,
    deleteShowtime,
    
} = require('../Controllers/showtimeController');

router.post('/', createShowtime);       // Handles POST to /api/showtimes
router.get('/', getAllShowtimes);      // Handles GET to /api/showtimes
router.get('/:id', getShowtimeById);   // Handles GET to /api/showtimes/:id
router.put('/:id', updateShowtime);    // Handles PUT to /api/showtimes/:id
router.delete('/:id', deleteShowtime); // Handles DELETE to /api/showtimes/:id


module.exports = router;