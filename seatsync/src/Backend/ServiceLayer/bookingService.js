const BookingModel = require('../Models/booking.model');
const ShowtimeModel = require('../Models/showtime.model');
class BookingService {
    static async createMovieBooking(bookingData, io) {
        const { showTimeId, seats } = bookingData;
        // Note: We'll need to get 'userId' from an auth system later.
        // For now, you can hardcode it for testing if needed.

        // 3. STEP 1: Update the Showtime to book the seats
        const updatedShowtime = await ShowtimeModel.findByIdAndUpdate(
            showTimeId,
            {
                // Use $push to add new items to the bookedSeats array
                $push: { bookedSeats: { $each: seats } }
            },
            { new: true } // This returns the updated document
        );

        if (!updatedShowtime) {
            throw new Error("Showtime not found, booking failed.");
        }
        try {
            let booking = await BookingModel.create({ ...bookingData })
            io.to(showTimeId).emit('seats_booked', booking.seats);
            return booking;
        }
        catch (error) {
            throw error;
        }
    }


}

module.exports = BookingService;