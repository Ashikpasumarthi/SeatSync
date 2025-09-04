const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // helpful when extra spaces, tabs have been added , so trim them Example:
        // Imagine a user accidentally types extra spaces in a form.

        // Before (User Input): "   Dune: Part Two   "

        // After (Saved in MongoDB with trim: true): "Dune: Part Two"
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    posterURL: {
        type: String,
        required: true,
        trim: true
    },
    bannerURL: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
