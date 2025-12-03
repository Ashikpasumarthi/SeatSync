const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movieName: { type: String, required: true },
    venue: { type: String, required: true },
    screen: { type: String, required: true },
    showTimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seats: [{ type: [String], required: true }],
    totalAmount: { type: Number, required: true }
})

const BookingModel = mongoose.model('booking', bookingSchema);

module.exports = BookingModel;