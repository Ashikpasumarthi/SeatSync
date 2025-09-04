const express = require('express');
const VenueService = require('../ServiceLayer/venueService.js');
async function createVenue(req, res) {
    const { name, city, address } = req.body;
    try {
        const newVenue = await VenueService.create({ name, city, address });
        res.status(201).json(newVenue);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create venue', details: error.message });
    }
}

async function getAllVenues(req, res) {
    try {
        const venues = await VenueService.allVenues();
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve venues', details: error.message });
    }
}

async function getVenueById(req, res) {
    const { id } = req.params;
    try {
        const venue = await VenueService.getVenueById(id);
        if (!venue) {
            return res.status(404).json({ error: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve venue', details: error.message });
    }
}

async function updateVenue(req, res) {
    const { id } = req.params;
    const { name, city, address } = req.body;
    try {
        const updatedVenue = await VenueService.updateVenue(id, { name, city, address });
        if (!updatedVenue) {
            return res.status(404).json({ error: 'Venue not found' });
        }
        res.status(200).json(updatedVenue);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update venue', details: error.message });
    }
}

async function deleteVenue(req, res) {
    const { id } = req.params;
    try {
        const deletedVenue = await VenueService.deleteVenue(id);
        if (!deletedVenue) {
            return res.status(404).json({ error: 'Venue not found' });
        }
        res.status(200).json({ message: 'Venue deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete venue', details: error.message });
    }
}

module.exports = {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenue,
    deleteVenue
};