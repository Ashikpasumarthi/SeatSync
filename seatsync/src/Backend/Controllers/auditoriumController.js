const express = require('express');
const  AuditoriumService  = require('../ServiceLayer/auditoriumService')

async function createAuditorium(req, res) {
    const { name, seatLayout, venue } = req.body;
    try {
        const newAuditorium = await AuditoriumService.createAuditorium({ name, seatLayout, venue });
        res.status(201).json(newAuditorium);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create auditorium', details: error.message });
    }
}

async function getAllAuditoriums(req, res) {
    try {
        const auditoriums = await AuditoriumService.getAllAuditoriums();
        res.status(200).json(auditoriums);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve auditoriums', details: error.message });
    }

}

async function getAuditoriumById(req, res) {
    const { id } = req.params;
    try {
        const auditorium = await AuditoriumService.getAuditoriumById(id);
        if (!auditorium) {
            return res.status(404).json({ error: 'Auditorium not found' });
        }
        res.status(200).json(auditorium);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve auditorium', details: error.message });
    }
}

async function updateAuditorium(req, res) {
    const { id } = req.params;
    const { name, seatLayout, venue } = req.body;
    try {
        const updatedAuditorium = await AuditoriumService.updateAuditorium(id, { name, seatLayout, venue });
        if (!updatedAuditorium) {
            return res.status(404).json({ error: 'Auditorium not found' });
        }
        res.status(200).json(updatedAuditorium);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update auditorium', details: error.message });
    }
}

async function deleteAuditorium(req, res) {
    const { id } = req.params;
    try {
        const deletedAuditorium = await AuditoriumService.deleteAuditorium(id);
        if (!deletedAuditorium) {
            return res.status(404).json({ error: 'Auditorium not found' });
        }
        res.status(200).json({ message: 'Auditorium deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete auditorium', details: error.message });
    }
}

module.exports = {
    createAuditorium,
    getAllAuditoriums,
    getAuditoriumById,
    updateAuditorium,
    deleteAuditorium
};