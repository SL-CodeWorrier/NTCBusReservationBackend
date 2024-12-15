const Route = require("../Models/routeModel"); // Importing the Route model

/**
 * Create a new route
 * @param {Object} routeData - The route data to save
 * @returns {Object} - Structured response containing success, message, and data
 */
const createRoute = async (routeData) => {
    try {
        const route = new Route(routeData);
        const savedRoute = await route.save();
        return {
            success: true,
            message: "Route created successfully",
            data: savedRoute,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to create route: ${error.message}`,
        };
    }
};

/**
 * Retrieve a route by its ID
 * @param {String} routeId - The ID of the route
 * @returns {Object} - Structured response containing success, message, and data
 */
const getRouteById = async (routeId) => {
    try {
        const route = await Route.findById(routeId);
        if (!route) {
            return {
                success: false,
                message: "Route not found",
                data: null,
            };
        }
        return {
            success: true,
            message: "Route retrieved successfully",
            data: route,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve route: ${error.message}`,
        };
    }
};

/**
 * Retrieve all routes
 * @returns {Object} - Structured response containing success, message, and data
 */
const getAllRoutes = async () => {
    try {
        const routes = await Route.find();
        return {
            success: true,
            message: "Routes retrieved successfully",
            data: routes,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve routes: ${error.message}`,
        };
    }
};

/**
 * Update a route by its ID
 * @param {String} routeId - The ID of the route to update
 * @param {Object} routeData - The data to update
 * @returns {Object} - Structured response containing success, message, and data
 */
const updateRoute = async (routeId, routeData) => {
    try {
        const updatedRoute = await Route.findByIdAndUpdate(routeId, routeData, { new: true });
        if (!updatedRoute) {
            return {
                success: false,
                message: "Route not found to update",
                data: null,
            };
        }
        return {
            success: true,
            message: "Route updated successfully",
            data: updatedRoute,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to update route: ${error.message}`,
        };
    }
};

/**
 * Delete a route by its ID
 * @param {String} routeId - The ID of the route to delete
 * @returns {Object} - Structured response containing success, message, and data
 */
const deleteRoute = async (routeId) => {
    try {
        const deletedRoute = await Route.findByIdAndDelete(routeId);
        if (!deletedRoute) {
            return {
                success: false,
                message: "Route not found to delete",
                data: null,
            };
        }
        return {
            success: true,
            message: "Route deleted successfully",
            data: deletedRoute,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to delete route: ${error.message}`,
        };
    }
};

/**
 * Retrieve a route by route number (unique identifier)
 * @param {String} routeNumber - The route number
 * @returns {Object} - Structured response containing success, message, and data
 */
const getRouteByNumber = async (routeNumber) => {
    try {
        const route = await Route.findOne({ routeNumber });
        if (!route) {
            return {
                success: false,
                message: "Route with that number not found",
                data: null,
            };
        }
        return {
            success: true,
            message: "Route retrieved successfully by number",
            data: route,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve route by number: ${error.message}`,
        };
    }
};

module.exports = {
    createRoute,
    getRouteById,
    getAllRoutes,
    updateRoute,
    deleteRoute,
    getRouteByNumber,
};