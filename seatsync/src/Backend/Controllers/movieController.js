const express = require('express');
const MovieService = require('../ServiceLayer/movieService');

async function createMovie(req, res) {
    let data = req.body;
    try {
        const result = await MovieService.createNewMovie(data);
        res.status(201).json({
            message: 'Movie successfully created',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error creating movie',
            error: error.message
        });
    }
}

async function getAllMovies(req, res) {
    try {
        const result = await MovieService.getMoviesData();
        res.status(200).json({
            message: 'Movies Data retrieved successfully',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving movies',
            error: error.message
        });
    }
}

async function getMovieById(req, res) {
    const params = req.params;
    const id = params.id;
    try {
        const result = await MovieService.getMovieDataById(id);
        res.status(200).json({
            message: 'Movie Data retrieved successfully using ID',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving movie',
            error: error.message
        });
    }
}

async function updateMovie(req, res) {
    const params = req.params;
    const id = params.id;
    const data = req.body;
    try {
        const result = await MovieService.movieUpdateByID(id, data);
        res.status(200).json({
            message: 'Movie Data updated successfully using ID',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error updating movie',
            error: error.message
        });
    }
}

async function deleteMovie(req, res) {
    const params = req.params;
    const id = params.id;
    try {
        const result = await MovieService.deleteMovieByID(id);
        res.status(200).json({
            message: 'Movie Data deleted successfully using ID',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving movie',
            error: error.message
        });
    }
}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
}