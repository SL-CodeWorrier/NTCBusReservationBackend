const Seat = require("../Models/seatModel");

// Retrieve a seat by its number
const getByNumber = async (number) => {
    try {
        const seat = await Seat.findOne({ number }).populate("bus");
        if (!seat) {
            return {
                success: false,
                message: "Seat not found",
            };
        }
        return {
            success: true,
            message: "Seat retrieved successfully",
            data: seat,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve seat: ${error.message}`,
        };
    }
};

// Retrieve seats by Bus ID with optional filters
const getSeatsByBusId = async (busId, isAvailable = null, isBookingInProgress = null, isWindowSeat = null) => {
    try {
        // Build a dynamic filter object based on the provided parameters
        const filter = { bus: busId };
        if (isAvailable !== null) filter.isAvailable = isAvailable;
        if (isBookingInProgress !== null) filter.isBookingInProgress = isBookingInProgress;
        if (isWindowSeat !== null) filter.isWindowSeat = isWindowSeat;

        const seats = await Seat.find(filter).populate("bus");
        if (!seats || seats.length === 0) {
            return {
                success: false,
                message: "No seats found for the specified criteria",
            };
        }
        return {
            success: true,
            message: "Seats retrieved successfully",
            data: seats,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve seats: ${error.message}`,
        };
    }
};

// Retrieve all seats by Bus ID when no filters are provided
const getAllSeatsByBusId = async (busId) => {
    try {
        const seats = await Seat.find({ bus: busId }).populate("bus");
        if (!seats || seats.length === 0) {
            return {
                success: false,
                message: "No seats found for the specified Bus ID",
            };
        }
        return {
            success: true,
            message: "All seats retrieved successfully",
            data: seats,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve seats: ${error.message}`,
        };
    }
};

module.exports = {
    getByNumber,
    getSeatsByBusId,
    getAllSeatsByBusId,
};