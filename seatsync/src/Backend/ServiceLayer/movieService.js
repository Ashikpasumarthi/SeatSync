const MovieModel = require('../Models/movie.model');

class MovieService {
    static async createNewMovie(data) {
        try {
            // This was already correct
            let movieData = await MovieModel.create(data);
            return movieData;
        } catch (error) {
            throw error;
        }
    }

    static async getMoviesData() {
        try {
            // This was also correct
            let response = await MovieModel.find();
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async getMovieDataById(id) {
        try {
            // CORRECTED: Use findById to search by the unique _id
            const response = await MovieModel.findById(id);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async deleteMovieByID(id) {
        try {
            // CORRECTED: Use findByIdAndDelete
            const response = await MovieModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // CORRECTED: Renamed to match the controller's call
    static async movieUpdateByID(id, data) {
        try {
            // CORRECTED: Use findByIdAndUpdate
            const response = await MovieModel.findByIdAndUpdate(id, data, { new: true });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

// It's more standard to export the class directly or an instance
module.exports = MovieService;