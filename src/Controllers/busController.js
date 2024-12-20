const {
    createBus,
    getAllBuses,
    getBusById,
    updateBusById,
    deleteBusById,
    getByBusNumber,
    getByAvailability,
    getByCTBorPrivate,
    getByValidate,
    getByBusOperatorId,
    getByRouteId,
} = require('../Repositories/busRepository');

const create = async (req, res) => {
    try {
        const result = await createBus(req.body);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getAll = async (req, res) => {
    try {
        const result = await getAllBuses();
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getById = async (req, res) => {
    try {
        const result = await getBusById(req.params.id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const updateById = async (req, res) => {
    try {
        const result = await updateBusById(req.params.id, req.body);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const result = await deleteBusById(req.params.id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getBusByBusNumber = async (req, res) => {
    try {
        const result = await getByBusNumber(req.query.busRegNumber);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getBusByAvailability = async (req, res) => {
    try {
        const result = await getByAvailability(req.query.isAvailable);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getBusByCTBorPrivate = async (req, res) => {
    try {
        const result = await getByCTBorPrivate(req.query.isCTBorPrivate);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getBusByValidate = async (req, res) => {
    try {
        const result = await getByValidate(req.query.isValidated);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getBusByBusOperatorId = async (req, res) => {
    try {
        const result = await getByBusOperatorId(req.params.busOperatorId);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getBusByRouteId = async (req, res) => {
    try {
        const result = await getByRouteId(req.params.routeId);
        return res.status(result.success ? 200 : 404).json(result);
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
    getAll,
    getById,
    updateById,
    deleteById,
    getBusByBusNumber,
    getBusByAvailability,
    getBusByCTBorPrivate,
    getBusByValidate,
    getBusByBusOperatorId,
    getBusByRouteId,
};