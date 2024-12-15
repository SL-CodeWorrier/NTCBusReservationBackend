const {
    createRoute,
    getRouteById,
    getAllRoutes,
    updateRoute,
    deleteRoute,
    getRouteByNumber,
} = require('../Repositories/routeRepository');

// Controller for creating a new route
const create = async (req, res) => {
    try {
        const routeData = req.body;
        const result = await createRoute(routeData);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while creating the route.",
            error: error.message,
        });
    }
};

// Controller for retrieving a route by its ID
const getById = async (req, res) => {
    try {
        const routeId = req.params.id;
        const result = await getRouteById(routeId);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while retrieving the route.",
            error: error.message,
        });
    }
};

// Controller for retrieving all routes
const getAll = async (req, res) => {
    try {
        const result = await getAllRoutes();
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while retrieving routes.",
            error: error.message,
        });
    }
};

// Controller for updating a route by its ID
const update = async (req, res) => {
    try {
        const routeId = req.params.id;
        const routeData = req.body;
        const result = await updateRoute(routeId, routeData);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while updating the route.",
            error: error.message,
        });
    }
};

// Controller for deleting a route by its ID
const deleteById = async (req, res) => {
    try {
        const routeId = req.params.id;
        const result = await deleteRoute(routeId);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while deleting the route.",
            error: error.message,
        });
    }
};

// Controller for retrieving a route by its route number
const getByNumber = async (req, res) => {
    try {
        const routeNumber = req.params.routeNumber;
        const result = await getRouteByNumber(routeNumber);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while retrieving the route.",
            error: error.message,
        });
    }
};

module.exports = {
    create,
    getById,
    getAll,
    update,
    deleteById,
    getByNumber,
};