const express = require('express');
// import { axios } from 'axios';
const ShowTime = require('../Models/showtime.model');

class ShowtimeService {
    static async createShowtime(data) {
        let { startTime, endTime, bookedSeats, movie, auditorium } = data;
        try {
            let showtimeData = await ShowTime.create({ startTime, endTime, bookedSeats, movie, auditorium });
            return showtimeData;
        } catch (error) {
            throw error;
        }
    }

    static async getShowtimesData() {
        try {
            let response = await ShowTime.find();
            return response;
        }
        catch (error) {
            throw error;
        }
    }

    static async getShowtimesDataById(id) {
        try {
            const response = await ShowTime.findById(id).populate({ path: 'auditorium', populate: { path: 'venue' } });
            return response;
        }
        catch (error) {
            throw error;
        }
    }

    static async deleteShowtimeByID(id) {
        try {
            const response = await ShowTime.deleteOne({ _id: id });
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async updateShowtimeByID(id, data) {
        try {
            const response = await ShowTime.updateOne({ _id: id }, { $set: data });
            return response;
        }
        catch (error) {
            throw error;
        }
    }

    static async getShowtimesByMovieId(movieId) {
        try {
            const response = await ShowTime.find({ movie: movieId }).populate({
                path: 'auditorium',
                populate: { path: 'venue' }
            }).populate('movie');
            return response;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = ShowtimeService;



//showtime collection lo anta data untadi right from movies to the venue , and all these for our visibility they are connected with id's but since populate is being used with a query it is getting the whole data
//movie,auditorium,venue collections are there for their own purpose and also there , useful for showtime collection too

// showtime collection is core and essential for managing the overall booking and scheduling process.


/***********************************this is how showtime collection looks***********************************/

// [
//   // Showtime #1: Kalki at AMB Cinemas
//   {
//     "_id": "showtime_abc",
//     "startTime": "2025-08-25T10:30:00.000Z",
//     "movie": {
//       "_id": "movie_kalki_id",
//       "title": "Kalki 2898-AD"
//     },
//     "auditorium": {
//       "_id": "auditorium_123",
//       "name": "Screen 1",
//       "venue": {
//         "_id": "amb_id",
//         "name": "AMB Cinemas"
//       }
//     },
//     "bookedSeats": ["C4", "C5"]
//   },

//   // Showtime #2: Kalki at Prasads IMAX
//   {
//     "_id": "showtime_xyz",
//     "startTime": "2025-08-25T11:00:00.000Z",
//     "movie": {
//       "_id": "movie_kalki_id",
//       "title": "Kalki 2898-AD"
//     },
//     "auditorium": {
//       "_id": "auditorium_986",
//       "name": "The Large Screen",
//       "venue": {
//         "_id": "prasads_id",
//         "name": "Prasads IMAX"
//       }
//     },
//     "bookedSeats": []
//   },

//   // Showtime #3: Singham Again at AMB Cinemas
//   {
//     "_id": "showtime_pqr",
//     "startTime": "2025-08-25T10:30:00.000Z",
//     "movie": {
//       "_id": "movie_singham_id",
//       "title": "Singham Again"
//     },
//     "auditorium": {
//       "_id": "auditorium_124",
//       "name": "Screen 2",
//       "venue": {
//         "_id": "amb_id",
//         "name": "AMB Cinemas"
//       }
//     },
//     "bookedSeats": ["D1", "D2", "D3"]
//   }
// ]

/***********************************end***********************************/




// Almost! It's more accurate to say that clicking a movie uses the **`Showtime` collection as the starting point** to find and connect all the data from the other collections.

// You've got the two main ideas, let's just clarify their roles.

// ---
// ## The Role of Each Collection

// Think of it like a shopping list.

// ### `Showtime` Collection (The Shopping List) 📝

// You are right that the process starts with the `Showtime` collection. A `Showtime` document is like your shopping list. It doesn't contain the actual items, it just contains the references:
// * Movie ID (e.g., "Kalki")
// * Auditorium ID (e.g., "Screen 1 at AMB")
// * The time

// ### Other Collections (The Supermarket Aisles) 🛒

// You are also right that the other collections (`Movies`, `Venues`, `Auditoriums`) have their own individual purpose. They are like the aisles in a supermarket. The `Movies` collection is the "Movie Aisle," the `Venues` collection is the "Cinema Aisle," and so on.

// They hold the actual, detailed products.



// ### `.populate()` (The Shopping Trip)

// When you run your query after a user clicks a movie:
// 1.  You first filter your **Shopping List** (`Showtime` collection) to find all the entries for "Kalki."
// 2.  Then, `.populate()` is the action of taking that list, walking down the **Supermarket Aisles** (`Movies`, `Auditoriums`, `Venues`), and picking up the actual products (the full details) that the IDs on your list point to.

// So, clicking the movie kicks off a process that **starts at `Showtime`** and then **gathers the details from all the other collections** to give you one complete package.





/******************************************************Better understanding ******************************************************/
// Yes, your understanding is now split into two parts, and you're thinking about it perfectly.

// -----

// ## 1\. "Showtime would be huge and has all the data?"

// This is a key distinction.

//   * The **API response** your frontend receives is large, because `.populate()` has assembled all the related data for you. ✅
//   * However, the **`showtimes` collection in your database** remains very small and efficient. It **only stores the IDs**. 💾

// Think of it like IKEA furniture. The final assembled bookshelf (`the API response`) is large and useful. But what you store in the warehouse (`the database`) is the compact flat-pack box (`the document with IDs`). `.populate()` is the process of following the instruction manual to build the bookshelf from the parts when you need it.

// -----

// ## 2\. "How we should read the data"

// Your way of reading the populated data is **exactly right\!** You just need to apply it to the specific example.

// Let's look at the third showtime from the last example:

// ```json
// {
//   "_id": "showtime_pqr",
//   "startTime": "2025-08-25T10:30:00.000Z",
//   "movie": {
//     "title": "Singham Again"
//   },
//   "auditorium": {
//     "name": "Screen 2",
//     "venue": {
//       "name": "AMB Cinemas"
//     }
//   }
// }
// ```

// Reading this exactly as you did, it means:

// > "At the venue named **'AMB Cinemas'**, the auditorium named **'Screen 2'** has the movie **'Singham Again'** playing at the start time **10:30 AM on Aug 25th**."

// You've got it. That's precisely how you translate the nested JSON back into a real-world event.