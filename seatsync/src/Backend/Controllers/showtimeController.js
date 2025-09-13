const express = require('express');
const ShowtimeService = require('../ServiceLayer/showtimeService');

async function createShowtime(req, res) {
    const showtime = req.body;
    try {
        const newShowtime = await ShowtimeService.createShowtime(showtime);
        res.status(201).json(newShowtime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllShowtimes(req, res) {
    try {
        const showtimes = await ShowtimeService.getShowtimesData();
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getShowtimeById(req, res) {
    const { id } = req.params;
    try {
        const showtime = await ShowtimeService.getShowtimeById(id); // A new service function
        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }
        res.status(200).json(showtime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateShowtime(req, res) {
    let params = req.params;
    let body = req.body;
    try {
        const updatedShowtime = await ShowtimeService.updateShowtimeByID(params.id, body);
        if (!updatedShowtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }
        res.status(200).json(updatedShowtime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteShowtime(req, res) {
    let params = req.params;
    try {
        const deletedShowtime = await ShowtimeService.deleteShowtimeByID(params.id);
        res.status(200).json(deletedShowtime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getShowtimesByMovieId(req, res) {
    const { movieId } = req.params;
    try {
        const showtimes = await ShowtimeService.getShowtimesByMovieId(movieId);
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createShowtime,
    getAllShowtimes,
    getShowtimeById,
    updateShowtime,
    deleteShowtime,
    getShowtimesByMovieId
};

//nModified