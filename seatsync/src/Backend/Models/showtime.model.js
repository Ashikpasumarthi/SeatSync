const mongoose = require('mongoose');

const showTimeSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
        trim: true, // helpful when extra spaces, tabs have been added , so trim them Example:
        // Imagine a user accidentally types extra spaces in a form.

        // Before (User Input): "   Dune: Part Two   "

        // After (Saved in MongoDB with trim: true): "Dune: Part Two"
    },
    endTime: {
        type: Date,
        required: true
    },
    bookedSeats: {
        type: [String]
    },
    heldSeats : {
        type: [String]
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    auditorium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auditorium",
        required: true
    }

}, { timestamps: true });

showTimeSchema.index({ startTime: 1, auditorium: 1 }, { unique: true });

const ShowTime = mongoose.model("ShowTime", showTimeSchema);

module.exports = ShowTime;
