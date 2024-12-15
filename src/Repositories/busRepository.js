const Bus = require('../Models/busModel');

// Create a new Bus
const createBus = async (busData) => {
    try {
        const newBus = new Bus(busData);
        const savedBus = await newBus.save();
        return {
            success: true,
            message: 'Bus created successfully',
            data: savedBus,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error creating bus: ${error.message}`,
        };
    }
};

// Get all Buses
const getAllBuses = async () => {
    try {
        const buses = await Bus.find().populate('busOperator route');
        return {
            success: true,
            message: 'Buses retrieved successfully',
            data: buses,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error retrieving buses: ${error.message}`,
        };
    }
};

// Get a Bus by ID
const getBusById = async (id) => {
    try {
        const bus = await Bus.findById(id).populate('busOperator route');
        if (!bus) {
            return {
                success: false,
                message: 'Bus not found',
            };
        }
        return {
            success: true,
            message: 'Bus retrieved successfully',
            data: bus,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error retrieving bus: ${error.message}`,
        };
    }
};

// Update a Bus by ID
const updateBusById = async (id, busData) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(id, busData, { new: true }).populate('busOperator route');
        if (!updatedBus) {
            return {
                success: false,
                message: 'Bus not found',
            };
        }
        return {
            success: true,
            message: 'Bus updated successfully',
            data: updatedBus,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error updating bus: ${error.message}`,
        };
    }
};

// Delete a Bus by ID
const deleteBusById = async (id) => {
    try {
        const deletedBus = await Bus.findByIdAndDelete(id);
        if (!deletedBus) {
            return {
                success: false,
                message: 'Bus not found',
            };
        }
        return {
            success: true,
            message: 'Bus deleted successfully',
        };
    } catch (error) {
        return {
            success: false,
            message: `Error deleting bus: ${error.message}`,
        };
    }
};

// Get Bus by Registration Number
const getByBusNumber = async (busRegNumber) => {
    try {
        const bus = await Bus.findOne({ busRegNumber }).populate('busOperator route');
        if (!bus) {
            return {
                success: false,
                message: 'Bus not found',
            };
        }
        return {
            success: true,
            message: 'Bus retrieved successfully',
            data: bus,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error retrieving bus: ${error.message}`,
        };
    }
};

// Get Buses by Availability
const getByAvailability = async (isAvailable) => {
    try {
        const buses = await Bus.find({ isAvailable }).populate('busOperator route');
        return {
            success: true,
            message: `Buses retrieved successfully with isAvailable = ${isAvailable}`,
            data: buses,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error retrieving buses: ${error.message}`,
        };
    }
};

// Get Buses by CTB or Private
const getByCTBorPrivate = async (isCTBorPrivate) => {
    try {
        const buses = await Bus.find({ isCTBorPrivate }).populate('busOperator route');
        return {
            success: true,
            message: `Buses retrieved successfully with isCTBorPrivate = ${isCTBorPrivate}`,
            data: buses,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error retrieving buses: ${error.message}`,
        };
    }
};

// Get Buses by Validation Status
const getByValidate = async (isValidated) => {
    try {
        const buses = await Bus.find({ isValidated }).populate('busOperator route');
        return {
            success: true,
            message: `Buses retrieved successfully with isValidated = ${isValidated}`,
            data: buses,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error retrieving buses: ${error.message}`,
        };
    }
};

// Get Buses by Bus Operator ID
const getByBusOperatorId = async (busOperatorId) => {
    try {
        const buses = await Bus.find({ busOperator: busOperatorId }).populate('busOperator route');
        return {
            success: true,
            message: 'Buses retrieved successfully by Bus Operator ID',
            data: buses,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error retrieving buses: ${error.message}`,
        };
    }
};

// Get Buses by Route ID
const getByRouteId = async (routeId) => {
    try {
        const buses = await Bus.find({ route: routeId }).populate('busOperator route');
        return {
            success: true,
            message: 'Buses retrieved successfully by Route ID',
            data: buses,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error retrieving buses: ${error.message}`,
        };
    }
};

module.exports = {
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
};