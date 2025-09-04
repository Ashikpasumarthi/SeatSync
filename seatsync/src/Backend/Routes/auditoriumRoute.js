const express = require('express');
const router = express.Router();
const {
    createAuditorium,
    getAllAuditoriums,
    getAuditoriumById,
    updateAuditorium,
    deleteAuditorium
} = require('../Controllers/auditoriumController');

router.post('/', createAuditorium);          // Handles POST to /api/auditoriums
router.get('/', getAllAuditoriums);         // Handles GET to /api/auditoriums
router.get('/:id', getAuditoriumById);      // Handles GET to /api/auditoriums/:id
router.put('/:id', updateAuditorium);       // Handles PUT to /api/auditoriums/:id
router.delete('/:id', deleteAuditorium);    // Handles DELETE to /api/auditoriums/:id

module.exports = router;