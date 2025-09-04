const mongoose = require('mongoose');

const auditoriumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // helpful when extra spaces, tabs have been added , so trim them Example:
        // Imagine a user accidentally types extra spaces in a form.

        // Before (User Input): "   Dune: Part Two   "

        // After (Saved in MongoDB with trim: true): "Dune: Part Two"
    },
    seatLayout: {
        type: [[String]],
        required: true,
    },
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    }
}, { timestamps: true });

auditoriumSchema.index({ name: 1, venue: 1 }, { unique: true });

const Auditorium = mongoose.model("Auditorium", auditoriumSchema);

module.exports = Auditorium;
