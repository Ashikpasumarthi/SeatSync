const  VenueModel  = require('../Models/venue.model');
class Venue {
    static async create(data) {
        try {
            const newVenue = await VenueModel.create(data);
            return newVenue;
        } catch (error) {
            throw new Error('Failed to create venue');
        }
    }

    static async allVenues() {
        try {
            const venues = await VenueModel.find();
            return venues;
        } catch (error) {
            throw new Error('Failed to retrieve venues');
        }
    }

    static async getVenueById(id) {
        try {
            const venue = await VenueModel.findById(id);
            return venue;
        } catch (error) {
            throw new Error('Failed to retrieve venue');
        }
    }

    static async updateVenue(id, data) {
        try {
            const updatedVenue = await VenueModel.findByIdAndUpdate(id, data, { new: true });
            return updatedVenue;
        } catch (error) {
            throw new Error('Failed to update venue');
        }
    }

    static async deleteVenue(id) {
        try {
            const deletedVenue = await VenueModel.findByIdAndDelete(id);
            return deletedVenue;
        } catch (error) {
            throw new Error('Failed to delete venue');
        }
    }
}


module.exports = Venue ;