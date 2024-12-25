const {
    createLocation,
    getLocationsByRouteNumber,
    getLocationsByName,
} = require('../Repositories/locationRepository');

const create = async (req, res) => {
    try {
        const result = await createLocation(req.body);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getLocationByRouteNo = async (req, res) => {
    try {
        const { routeNo } = req.params;
        const result = await getLocationsByRouteNumber(routeNo);
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getLocationByLocationName = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await getLocationsByName(name);
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

module.exports = {
    create,
    getLocationByRouteNo,
    getLocationByLocationName
};