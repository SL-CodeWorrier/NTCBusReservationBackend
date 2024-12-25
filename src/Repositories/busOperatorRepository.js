const BusOperator = require('../Models/busOperatorModel'); // Import the BusOperator model
const User = require('../Models/userModel'); // Import the User model if needed

/**
 * Create a new bus operator
 * @param {Object} busOperatorData - The bus operator data to save
 * @returns {Object} - Structured response containing success, message, and data
 */
const createBusOperator = async (busOperatorData) => {
    try {
        const busOperator = new BusOperator(busOperatorData);
        const savedBusOperator = await busOperator.save();
        return {
            success: true,
            message: 'Bus operator created successfully',
            data: savedBusOperator,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to create bus operator: ${error.message}`,
            data: null,
        };
    }
};

/**
 * Retrieve all bus operators
 * @returns {Object} - Structured response containing success, message, and data
 */
const getAllBusOperators = async () => {
    try {
        const busOperators = await BusOperator.find();
        return {
            success: true,
            message: 'Bus operators retrieved successfully',
            data: busOperators,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve bus operators: ${error.message}`,
        };
    }
};

/**
 * Retrieve a bus operator by ID
 * @param {String} id - The ID of the bus operator
 * @returns {Object} - Structured response containing success, message, and data
 */
const getBusOperatorById = async (id) => {
    try {
        const busOperator = await BusOperator.findById(id);
        return {
            success: true,
            message: 'Bus operator retrieved successfully',
            data: busOperator,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve bus operator: ${error.message}`,
        };
    }
};

/**
 * Update a bus operator by ID
 * @param {String} id - The ID of the bus operator to update
 * @param {Object} updateData - The data to update
 * @returns {Object} - Structured response containing success, message, and data
 */
const updateBusOperatorById = async (id, updateData) => {
    try {
        const updatedBusOperator = await BusOperator.findByIdAndUpdate(id, updateData, { new: true });
        return {
            success: true,
            message: 'Bus operator updated successfully',
            data: updatedBusOperator,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to update bus operator: ${error.message}`,
        };
    }
};

/**
 * Delete a bus operator by ID
 * @param {String} id - The ID of the bus operator to delete
 * @returns {Object} - Structured response containing success, message, and data
 */
const deleteBusOperatorById = async (id) => {
    try {
        const deletedBusOperator = await BusOperator.findByIdAndDelete(id);
        return {
            success: true,
            message: 'Bus operator deleted successfully',
            data: deletedBusOperator,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to delete bus operator: ${error.message}`,
        };
    }
};

/**
 * Retrieve bus operator by phone number
 * @param {String} phoneNumber - The phone number of the bus operator
 * @returns {Object} - Structured response containing success, message, and data
 */
const getBusOperatorByPhoneNumber = async (phoneNumber) => {
    try {
        const busOperator = await BusOperator.findOne({ phoneNumber }); 
        
        if (busOperator == null) {
            return {
                success: false,
                message: 'No bus operator found with the given phone number',
                data: null,
            };
        }
        return {
            success: true,
            message: 'Bus operator retrieved successfully by phone number',
            data: busOperator,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve bus operator by phone number: ${error.message}`,
        };
    }
};

/**
 * Retrieve bus operator by user ID
 * @param {String} userId - The user ID associated with the bus operator
 * @returns {Object} - Structured response containing success, message, and data
 */
const getBusOperatorByUserId = async (userId) => {
    try {
        const busOperator = await BusOperator.findOne({ userId }).populate('user');
        if (!busOperator) {
            return {
                success: false,
                message: 'No bus operator found for the given user ID',
                data: null,
            };
        }
        return {
            success: true,
            message: 'Bus operator retrieved successfully by user ID',
            data: busOperator,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve bus operator by user ID: ${error.message}`,
        };
    }
};

module.exports = {
    createBusOperator,
    getAllBusOperators,
    getBusOperatorById,
    updateBusOperatorById,
    deleteBusOperatorById,
    getBusOperatorByPhoneNumber,
    getBusOperatorByUserId,
};