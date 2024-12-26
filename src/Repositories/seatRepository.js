const Seat = require("../Models/seatModel");
const Bus = require("../Models/busModel");

// Retrieve a seat by its number
const getByNumber = async (number, busRegNumber) => {
    try {
        // Find the bus by its registration number
        const bus = await Bus.findOne({ busRegNumber });

        if (!bus) {
            return {
                success: false,
                message: "Bus not found",
            };
        }

        // Find the seat by number and ensure it matches the bus ID
        const seat = await Seat.findOne({ number, bus: bus._id }).populate("bus");

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

// Function to create a new Seat
const createSeat = async (number, isAvailable, isBookingInProgress, isWindowSeat, busId) => {
    try {
        // Create a new Seat entry
        const newSeat = new Seat({
            number,
            isAvailable,
            isBookingInProgress,
            isWindowSeat,
            bus: busId  // Assuming busId is the ObjectId of an existing Bus document
        });

        // Save the new Seat entry to the database
        const savedSeat = await newSeat.save();

        return {
            success: true,
            message: "Seat created successfully",
            data: savedSeat,
        };

    } catch (error) {

        return {
            success: false,
            message: "Error creating Seat",
            data: null,
        };
    }
};

module.exports = {
    getByNumber,
    getSeatsByBusId,
    getAllSeatsByBusId,
    createSeat
};