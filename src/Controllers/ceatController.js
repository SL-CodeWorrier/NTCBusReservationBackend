const express = require("express");
const router = express.Router();
const { getByNumber, getSeatsByBusId, getAllSeatsByBusId } = require("../Repositories/seatRepository");

// Controller for retrieving a seat by its number
const getSeatByNumberController = async (req, res) => {
    const { number } = req.params;

    try {
        const result = await getByNumber(number);
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

module.exports = router;