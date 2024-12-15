const Permit = require("../Models/permitModel");

// Create a new permit
const createPermit = async (permitData) => {
    try {
        const permit = await Permit.create(permitData);
        return {
            success: true,
            message: "Permit created successfully",
            data: permit,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to create permit: ${error.message}`,
        };
    }
};

// Retrieve all permits
const getAllPermits = async () => {
    try {
        const permits = await Permit.find().populate(["busOperator", "route", "bus"]);
        return {
            success: true,
            message: "All permits retrieved successfully",
            data: permits,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve permits: ${error.message}`,
        };
    }
};

// Retrieve a permit by ID
const getPermitById = async (id) => {
    try {
        const permit = await Permit.findById(id).populate(["busOperator", "route", "bus"]);
        if (!permit) {
            return {
                success: false,
                message: "Permit not found",
            };
        }
        return {
            success: true,
            message: "Permit retrieved successfully",
            data: permit,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve permit: ${error.message}`,
        };
    }
};

// Update a permit by ID
const updatePermitById = async (id, permitData) => {
    try {
        const permit = await Permit.findByIdAndUpdate(id, permitData, { new: true }).populate(["busOperator", "route", "bus"]);
        if (!permit) {
            return {
                success: false,
                message: "Permit not found",
            };
        }
        return {
            success: true,
            message: "Permit updated successfully",
            data: permit,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to update permit: ${error.message}`,
        };
    }
};

// Delete a permit by ID
const deletePermitById = async (id) => {
    try {
        const permit = await Permit.findByIdAndDelete(id);
        if (!permit) {
            return {
                success: false,
                message: "Permit not found",
            };
        }
        return {
            success: true,
            message: "Permit deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to delete permit: ${error.message}`,
        };
    }
};

// Retrieve a permit by NTC Permit Number
const getPermitByNTCPermitNo = async (ntcPermitNo) => {
    try {
        const permit = await Permit.findOne({ ntcPermitNo }).populate(["busOperator", "route", "bus"]);
        if (!permit) {
            return {
                success: false,
                message: "Permit not found",
            };
        }
        return {
            success: true,
            message: "Permit retrieved successfully",
            data: permit,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve permit: ${error.message}`,
        };
    }
};

// Retrieve permits by bus number
const getPermitByBusNumber = async (busNo) => {
    try {
        const permits = await Permit.find({ busNo }).populate(["busOperator", "route", "bus"]);
        return {
            success: true,
            message: "Permits retrieved successfully",
            data: permits,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve permits: ${error.message}`,
        };
    }
};

// Retrieve permits by service type
const getPermitsByServiceType = async (serviceType) => {
    try {
        const permits = await Permit.find({ serviceType }).populate(["busOperator", "route", "bus"]);
        return {
            success: true,
            message: "Permits retrieved successfully",
            data: permits,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve permits: ${error.message}`,
        };
    }
};

// Retrieve permits by validity status
const getPermitsByValidity = async (isValid) => {
    try {
        const permits = await Permit.find({ isValid }).populate(["busOperator", "route", "bus"]);
        return {
            success: true,
            message: `Permits retrieved successfully for isValid = ${isValid}`,
            data: permits,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve permits: ${error.message}`,
        };
    }
};

// Retrieve permits by bus operator ID
const getPermitsByBusOperatorId = async (busOperatorId) => {
    try {
        const permits = await Permit.find({ busOperator: busOperatorId }).populate(["busOperator", "route", "bus"]);
        return {
            success: true,
            message: "Permits retrieved successfully",
            data: permits,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve permits: ${error.message}`,
        };
    }
};

// Retrieve permits by route ID
const getPermitsByRouteId = async (routeId) => {
    try {
        const permits = await Permit.find({ route: routeId }).populate(["busOperator", "route", "bus"]);
        return {
            success: true,
            message: "Permits retrieved successfully",
            data: permits,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve permits: ${error.message}`,
        };
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