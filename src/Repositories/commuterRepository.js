const Commuter = require('../Models/commuterModel'); // Import the Commuter model
const User = require('../Models/userModel'); // Import the User model if needed

/**
 * Create a new commuter
 * @param {Object} commuterData - The commuter data to save
 * @returns {Object} - Structured response containing success, message, and data
 */
const createCommuter = async (commuterData) => {
    try {
        const commuter = new Commuter(commuterData);
        const savedCommuter = await commuter.save();
        return {
            success: true,
            message: 'Commuter created successfully',
            data: savedCommuter,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to create commuter: ${error.message}`,
        };
    }
};

/**
 * Retrieve all commuters
 * @returns {Object} - Structured response containing success, message, and data
 */
const getAllCommuters = async () => {
    try {
        const commuters = await Commuter.find().populate('user');
        return {
            success: true,
            message: 'Commuters retrieved successfully',
            data: commuters,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve commuters: ${error.message}`,
        };
    }
};

/**
 * Retrieve a commuter by ID
 * @param {String} id - The ID of the commuter
 * @returns {Object} - Structured response containing success, message, and data
 */
const getCommuterById = async (id) => {
    try {
        const commuter = await Commuter.findById(id).populate('user');
        return {
            success: true,
            message: 'Commuter retrieved successfully',
            data: commuter,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve commuter: ${error.message}`,
        };
    }
};

/**
 * Update a commuter by ID
 * @param {String} id - The ID of the commuter to update
 * @param {Object} updateData - The data to update
 * @returns {Object} - Structured response containing success, message, and data
 */
const updateCommuterById = async (id, updateData) => {
    try {
        const updatedCommuter = await Commuter.findByIdAndUpdate(id, updateData, { new: true }).populate('user');
        return {
            success: true,
            message: 'Commuter updated successfully',
            data: updatedCommuter,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to update commuter: ${error.message}`,
        };
    }
};

/**
 * Delete a commuter by ID
 * @param {String} id - The ID of the commuter to delete
 * @returns {Object} - Structured response containing success, message, and data
 */
const deleteCommuterById = async (id) => {
    try {
        const deletedCommuter = await Commuter.findByIdAndDelete(id);
        return {
            success: true,
            message: 'Commuter deleted successfully',
            data: deletedCommuter,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to delete commuter: ${error.message}`,
        };
    }
};

/**
 * Retrieve commuters by province
 * @param {String} province - The province to filter by
 * @returns {Object} - Structured response containing success, message, and data
 */
const getCommutersByProvince = async (province) => {
    try {
        const commuters = await Commuter.find({ province }).populate('user');
        return {
            success: true,
            message: 'Commuters retrieved successfully by province',
            data: commuters,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve commuters by province: ${error.message}`,
        };
    }
};

/**
 * Retrieve commuters by city
 * @param {String} city - The city to filter by
 * @returns {Object} - Structured response containing success, message, and data
 */
const getCommutersByCity = async (city) => {
    try {
        const commuters = await Commuter.find({ city }).populate('user');
        return {
            success: true,
            message: 'Commuters retrieved successfully by city',
            data: commuters,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve commuters by city: ${error.message}`,
        };
    }
};

/**
 * Retrieve a commuter by phone number or email
 * @param {String} credential - The phone number or email to search for
 * @returns {Object} - Structured response containing success, message, and data
 */
const getCommuterByPhoneNumberOrEmail = async (credential) => {
    try {
        const user = await User.findOne({
            $or: [
                { phonenumber: credential },
                { username: credential },
            ],
        });

        if (!user) {
            return {
                success: false,
                message: 'No user found with the given phone number or email',
                data: null,
            };
        }

        const commuter = await Commuter.findOne({ user: user._id }).populate('user');
        return {
            success: true,
            message: 'Commuter retrieved successfully by phone number or email',
            data: commuter,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve commuter by phone number or email: ${error.message}`,
        };
    }
};

module.exports = {
    createCommuter,
    getAllCommuters,
    getCommuterById,
    updateCommuterById,
    deleteCommuterById,
    getCommutersByProvince,
    getCommutersByCity,
    getCommuterByPhoneNumberOrEmail,
};