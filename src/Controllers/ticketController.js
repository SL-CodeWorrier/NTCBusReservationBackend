const express = require("express");
const router = express.Router();
const { getTicketById, getTicketsByReservationId } = require("../Repositories/tickectRepository");

// Controller for retrieving a seat by its number
const getTicketByTicketId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await getTicketById(id);
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
const getTicketsByTicketReservationId = async (req, res) => {
    const { reservationId } = req.params;

    try {
        const result = await getTicketsByReservationId(
            reservationId
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

module.exports = {
    getTicketByTicketId,
    getTicketsByTicketReservationId
};