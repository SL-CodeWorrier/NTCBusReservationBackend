// Required modules
const permitRepository = require("../Repositories/permitRepository");

// Controller to handle permit-related operations

// Create a new permit
const createPermit = async (req, res) => {
    const permitData = req.body;
    const result = await permitRepository.createPermit(permitData);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json(result);
    }
};

// Get all permits
const getAllPermits = async (req, res) => {
    const result = await permitRepository.getAllPermits();
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
};

// Get a permit by ID
const getPermitById = async (req, res) => {
    const { id } = req.params;
    const result = await permitRepository.getPermitById(id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(404).json(result);
    }
};

// Update a permit by ID
const updatePermitById = async (req, res) => {
    const { id } = req.params;
    const permitData = req.body;
    const result = await permitRepository.updatePermitById(id, permitData);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
};

// Delete a permit by ID
const deletePermitById = async (req, res) => {
    const { id } = req.params;
    const result = await permitRepository.deletePermitById(id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(404).json(result);
    }
};

// Get a permit by NTC Permit Number
const getPermitByNTCPermitNo = async (req, res) => {
    const { ntcPermitNo } = req.params;
    const result = await permitRepository.getPermitByNTCPermitNo(ntcPermitNo);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(404).json(result);
    }
};

// Get permits by bus number
const getPermitByBusNumber = async (req, res) => {
    const { busNo } = req.params;
    const result = await permitRepository.getPermitByBusNumber(busNo);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
};

// Get permits by service type
const getPermitsByServiceType = async (req, res) => {
    const { serviceType } = req.params;
    const result = await permitRepository.getPermitsByServiceType(serviceType);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
};

// Get permits by validity status
const getPermitsByValidity = async (req, res) => {
    const { isValid } = req.params;
    const result = await permitRepository.getPermitsByValidity(isValid);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
};

// Get permits by bus operator ID
const getPermitsByBusOperatorId = async (req, res) => {
    const { busOperatorId } = req.params;
    const result = await permitRepository.getPermitsByBusOperatorId(busOperatorId);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
};

// Get permits by route ID
const getPermitsByRouteId = async (req, res) => {
    const { routeId } = req.params;
    const result = await permitRepository.getPermitsByRouteId(routeId);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
};

module.exports = {
    createPermit,
    getAllPermits,
    getPermitById,
    updatePermitById,
    deletePermitById,
    getPermitByNTCPermitNo,
    getPermitByBusNumber,
    getPermitsByServiceType,
    getPermitsByValidity,
    getPermitsByBusOperatorId,
    getPermitsByRouteId,
};