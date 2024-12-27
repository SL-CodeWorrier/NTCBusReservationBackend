const RouteAvailability = require('../Models/routeAvailabilityModel'); // Import the RouteAvailability model
const Route = require('../Models/routeModel'); // Import the RouteAvailability model
const { route } = require('../Routes/commuterRoute');

/**
 * Retrieve all route availabilities.
 * If ⁠ isAvailable ⁠ is null, it returns all records.
 * Otherwise, filters records based on the ⁠ isAvailable ⁠ value.
 * @param {Boolean|null} isAvailable - Availability status to filter by (true/false) or null for all.
 * @returns {Object} - Structured response containing success, message, and data
 */
const getAllRouteAvailabilities = async (isAvailable) => {
    try {

        // Fetch data from the database
        const routeAvailabilities = isAvailable == null ?
         await RouteAvailability.find().populate('route') :
         isAvailable == true ?
            await RouteAvailability.find({ isAvailable: true }).populate('route') :
            await RouteAvailability.find({ isAvailable: false }).populate('route')

        return {
            success: true,
            message: 'All route availabilities retrieved successfully',
            data: routeAvailabilities,
        };
    } catch (error) {
        console.log(error.message);
        return {
            success: false,
            message: 'Cannot send all route availabilities!',
            data: null,
        };
    }
};

module.exports = {
    getAllRouteAvailabilities,
};