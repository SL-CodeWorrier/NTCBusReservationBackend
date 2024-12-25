const Location = require('../Models/locationModel'); // Import the location model
const Route = require('../Models/routeModel'); // Import the route model

/**
 * Create a new bus operator
 * @param {Object} locationData - The location data to save
 * @returns {Object} - Structured response containing success, message, and data
 */
const createLocation = async (locationData) => {
    try {
        const location = new Location(locationData);
        const saveLocation = await location.save();
        return {
            success: true,
            message: 'Location added successfully',
            data: saveLocation,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to add location: ${error.message}`,
            data: null,
        };
    }
};

const getLocationsByName = async (locationName) => {
    try {
        
        const location = await Location.findOne({Name: locationName}).populate('route');

        return {
            success: true,
            message: location !== null ? 'Location retrieved successfully' : 'Location not found!',
            data: location,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve locations: ${error.message}`,
        };
    }
};

const getLocationsByRouteNumber = async (routeNumber) => {
    
    try {
        
        const route = await Route.findOne({routeNumber: routeNumber});

        if (!route) {
            return {
                success: false,
                message: 'No route found with the given route number',
                data: null,
            };
        }  

        const locations = await Location.find({route: route._id});

        return {
            success: true,
            message: locations !== null ? 'Locations retrieved successfully' : 'Locations not found!',
            data: locations,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve locations: ${error.message}`,
        };
    }
};

module.exports = {
    createLocation,
    getLocationsByRouteNumber,
    getLocationsByName
};