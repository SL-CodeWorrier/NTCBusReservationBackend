const express = require("express");
const router = express.Router();
const {
    createReservation,
    getReservationById,
    updateReservationById,
    deleteReservationById,
    getReservationsByCommuterId,
    getReservationsByRouteId,
} = require("../Repositories/reservationRepository");

// Controller for creating a new reservation
const createReservationController = async (req, res) => {
    try {
        const result = await createReservation(req.body);
        if (result.success) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

// Controller for retrieving a reservation by its ID
const getReservationByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await getReservationById(id);
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

// Controller for updating a reservation by its ID
const updateReservationByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await updateReservationById(id, req.body);
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

// Controller for deleting a reservation by its ID
const deleteReservationByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteReservationById(id);
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

// Controller for retrieving reservations by commuter ID
const getReservationsByCommuterIdController = async (req, res) => {
    const { commuterId } = req.params;

    try {
        const result = await getReservationsByCommuterId(commuterId);
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

// Controller for retrieving reservations by route ID
const getReservationsByRouteIdController = async (req, res) => {
    const { routeId } = req.params;

    try {
        const result = await getReservationsByRouteId(routeId);
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