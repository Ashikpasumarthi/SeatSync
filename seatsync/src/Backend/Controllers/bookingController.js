const BookingService = require('../ServiceLayer/bookingService')
async function createBooking(req, res) {
    const bookingData = req.body;

    const io = req.app.get('io');
    try {
        const result = await BookingService.createMovieBooking(bookingData, io);
        res.status(201).json({ message: 'Booking created successfully', data: result });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });

    }
}


module.exports = { createBooking };