const express = require("express");
const router = express.Router();
const { getByNumber, getSeatsByBusId, getAllSeatsByBusId, createSeat } = require("../Repositories/seatRepository");

// Function to create a timetable entry for a specific bus
const createSeatForBus = async (req, res) => {
    const { number, isAvailable, isBookingInProgress, isWindowSeat, busId } = req.body;

    // Check if all required fields are provided
    if (!number || isAvailable === undefined || isBookingInProgress === undefined || isWindowSeat === undefined || !busId) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: number, isAvailable, isBookingInProgress, isWindowSeat, busId',
        });
    }

    try {
        // Call the createSeat function
        const result = await createSeat(number, isAvailable, isBookingInProgress, isWindowSeat, busId);

        if (result.success) {
            // Return success response with created seat data
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result.data,
            });
        } else {
            // Return error response
            return res.status(500).json({
                success: false,
                message: result.message,
                data: result.data,
            });
        }
    } catch (error) {
        console.error('Error in creating Seat:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the Seat.',
            data: null,
        });
    }
};

// Controller for retrieving a seat by its number
const getSeatByNumberController = async (req, res) => {
    const { number } = req.params;
    const { busRegNumber } = req.query;

    try {
        const result = await getByNumber(number, busRegNumber);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

// Controller for retrieving seats by Bus ID with optional filters
const getSeatsByBusIdController = async (req, res) => {
    const { busId } = req.params;
    const { isAvailable, isBookingInProgress, isWindowSeat } = req.query;

    try {
        const result = await getSeatsByBusId(
            busId,
            isAvailable === undefined ? null : isAvailable === "true",
            isBookingInProgress === undefined ? null : isBookingInProgress === "true",
            isWindowSeat === undefined ? null : isWindowSeat === "true"
        );

        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

// Controller for retrieving all seats by Bus ID
const getAllSeatsByBusIdController = async (req, res) => {
    const { busId } = req.params;

    try {
        const result = await getAllSeatsByBusId(busId);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

module.exports = {
    getSeatByNumberController,
    getSeatsByBusIdController,
    getAllSeatsByBusIdController,
    createSeatForBus
};