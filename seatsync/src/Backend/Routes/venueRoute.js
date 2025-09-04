const express = require('express');
const router = express.Router();
const {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenue,
    deleteVenue
} = require('../Controllers/venueController');

router.post('/', createVenue);          // Handles POST to /api/venues
router.get('/', getAllVenues);         // Handles GET to /api/venues
router.get('/:id', getVenueById);      // Handles GET to /api/venues/:id
router.put('/:id', updateVenue);       // Handles PUT to /api/venues/:id
router.delete('/:id', deleteVenue);    // Handles DELETE to /api/venues/:id

module.exports = router;