const express = require('express');
const Auditorium = require('../Models/auditorium.model');

class AuditoriumService {
    static async createAuditorium(data) {
        try {
            const newAuditorium = await Auditorium.create(data);
            return newAuditorium;
        } catch (error) {
            throw new Error('Failed to create auditorium');
        }
    }

    static async getAllAuditoriums() {
        try {
            const auditoriums = await Auditorium.find();
            return auditoriums;
        } catch (error) {
            throw new Error('Failed to retrieve auditoriums');
        }
    }

    static async getAuditoriumById(id) {
        try {
            const auditorium = await Auditorium.findById(id).populate('venue');
            if (!auditorium) throw new Error('Auditorium not found');
            return auditorium;
        } catch (error) {
            throw new Error('Failed to retrieve auditorium');
        }
    }

    static async updateAuditorium(id, data) {
        try {
            const updatedAuditorium = await Auditorium.findByIdAndUpdate(id, data, { new: true });
            if (!updatedAuditorium) throw new Error('Auditorium not found');
            return updatedAuditorium;
        } catch (error) {
            throw new Error('Failed to update auditorium');
        }
    }

    static async deleteAuditorium(id) {
        try {
            const deletedAuditorium = await Auditorium.findByIdAndDelete(id);
            if (!deletedAuditorium) throw new Error('Auditorium not found');
            return deletedAuditorium;
        } catch (error) {
            throw new Error('Failed to delete auditorium');
        }
    }
}

module.exports = AuditoriumService;



// Of course. Here is what multiple documents would look like inside your `auditoriums` collection in the database, showing screens from different venues in Hyderabad.

// -----

// ## `auditoriums` collection 🍿

// This collection stores the details for every individual screen. Notice how each document has its own unique `_id`, and the `venue` field is the crucial link connecting it back to a specific cinema.

// ```json
// [
//   // --- Auditoriums for AMB Cinemas ---
//   {
//     "_id": "auditorium_123",
//     "name": "Screen 1",
//     "seatLayout": [
//       ["A1", "A2", "A3", "A4"],
//       ["B1", "B2", "B3", "B4"]
//     ],
//     "venue": "amb_id" // <-- Link to AMB Cinemas
//   },
//   {
//     "_id": "auditorium_124",
//     "name": "Screen 2",
//     "seatLayout": [
//       ["A1", "A2", "A3"],
//       ["B1", "B2", "B3"]
//     ],
//     "venue": "amb_id" // <-- Link to AMB Cinemas
//   },

//   // --- Auditoriums for Prasads IMAX ---
//   {
//     "_id": "auditorium_986",
//     "name": "The Large Screen",
//     "seatLayout": [
//       ["R1_A1", "R1_A2", "R1_A3"],
//       ["R2_B1", "R2_B2", "R2_B3"]
//     ],
//     "venue": "prasads_id" // <-- Link to Prasads IMAX
//   },
//   {
//     "_id": "auditorium_987",
//     "name": "Screen 2",
//     "seatLayout": [
//       ["A1", "A2", "A3"],
//       ["B1", "B2", "B3"]
//     ],
//     "venue": "prasads_id" // <-- Link to Prasads IMAX
//   }
// ]
// ```

// -----

// ## Key Takeaways

//   * **Unique `_id`**: Even though both AMB and Prasads have a "Screen 2," they are completely different documents with their own unique `_id`.
//   * **The `venue` Link**: The `venue` field is what tells you that `"auditorium_124"` is the screen at AMB, while `"auditorium_987"` is the screen at Prasads. This is the **one-to-many** relationship in action.