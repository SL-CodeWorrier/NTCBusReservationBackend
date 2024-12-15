const Reservation = require("../Models/reservationModel");

// Create a new reservation
const createReservation = async (data) => {
    try {
        const reservation = new Reservation(data);
        const savedReservation = await reservation.save();
        return {
            success: true,
            message: "Reservation created successfully",
            data: savedReservation,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to create reservation: ${error.message}`,
        };
    }
};

// Retrieve a reservation by its ID
const getReservationById = async (id) => {
    try {
        const reservation = await Reservation.findById(id)
            .populate("listOfSeats")
            .populate("commuter")
            .populate("route");
        if (!reservation) {
            return {
                success: false,
                message: "Reservation not found",
            };
        }
        return {
            success: true,
            message: "Reservation retrieved successfully",
            data: reservation,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve reservation: ${error.message}`,
        };
    }
};

// Update a reservation by its ID
const updateReservationById = async (id, data) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, data, { new: true })
            .populate("listOfSeats")
            .populate("commuter")
            .populate("route");
        if (!updatedReservation) {
            return {
                success: false,
                message: "Reservation not found",
            };
        }
        return {
            success: true,
            message: "Reservation updated successfully",
            data: updatedReservation,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to update reservation: ${error.message}`,
        };
    }
};

// Delete a reservation by its ID
const deleteReservationById = async (id) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        if (!deletedReservation) {
            return {
                success: false,
                message: "Reservation not found",
            };
        }
        return {
            success: true,
            message: "Reservation deleted successfully",
            data: deletedReservation,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to delete reservation: ${error.message}`,
        };
    }
};

// Retrieve reservations by Commuter ID
const getReservationsByCommuterId = async (commuterId) => {
    try {
        const reservations = await Reservation.find({ commuter: commuterId })
            .populate("listOfSeats")
            .populate("route");
        if (!reservations || reservations.length === 0) {
            return {
                success: false,
                message: "No reservations found for the specified Commuter ID",
            };
        }
        return {
            success: true,
            message: "Reservations retrieved successfully",
            data: reservations,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve reservations: ${error.message}`,
        };
    }
};

// Retrieve reservations by Route ID
const getReservationsByRouteId = async (routeId) => {
    try {
        const reservations = await Reservation.find({ route: routeId })
            .populate("listOfSeats")
            .populate("commuter");
        if (!reservations || reservations.length === 0) {
            return {
                success: false,
                message: "No reservations found for the specified Route ID",
            };
        }
        return {
            success: true,
            message: "Reservations retrieved successfully",
            data: reservations,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve reservations: ${error.message}`,
        };
    }
};

module.exports = {
    createReservation,
    getReservationById,
    updateReservationById,
    deleteReservationById,
    getReservationsByCommuterId,
    getReservationsByRouteId,
};