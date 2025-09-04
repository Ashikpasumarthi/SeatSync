const mongoose = require('mongoose');


const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // helpful when extra spaces, tabs have been added , so trim them Example:
        // Imagine a user accidentally types extra spaces in a form.

        // Before (User Input): "   Dune: Part Two   "

        // After (Saved in MongoDB with trim: true): "Dune: Part Two"
        unique: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },

}, { timestamps: true });

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
