const RouteAvailability = require('../Models/routeAvailabilityModel'); // Import the RouteAvailability model

/**
 * Retrieve all route availabilities.
 * If ⁠ isAvailable ⁠ is null, it returns all records.
 * Otherwise, filters records based on the ⁠ isAvailable ⁠ value.
 * @param {Boolean|null} isAvailable - Availability status to filter by (true/false) or null for all.
 * @returns {Object} - Structured response containing success, message, and data
 */
const getAllRouteAvailabilities = async (isAvailable) => {
    try {
        // Build the query based on the ⁠ isAvailable ⁠ parameter
        const query = isAvailable !== null ? { isAvailable } : {};

        // Fetch data from the database
        const routeAvailabilities = await RouteAvailability.find(query).populate('route');

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