const Reservation = require("../Models/reservationModel");
const Seat = require("../Models/seatModel");

const createReservation = async (data) => {
    try {
        // Create a new reservation
        const reservation = new Reservation(data);
        const savedReservation = await reservation.save();

        // Update seat availability
        const seatUpdates = data.listOfSeats.map((seatId) =>
            Seat.findByIdAndUpdate(
                seatId,
                { isAvailable: false, isBookingInProgress: true }, // Correctly structured update object
                { new: true } // Options
            )
        );

        // Wait for all seat updates to complete
        const updatedSeats = await Promise.all(seatUpdates);

        if (!updatedSeats || updatedSeats.some(seat => !seat)) {
            return {
                success: false,
                message: "Failed to update one or more seats",
            };
        }

        // Twilio credentials
        const accountSid = 'ACf666f979077bf5ab8061431197a62e0e';
        const authToken = '979753717cdc36a668dd4c4e961e80ef';
        const client = require('twilio')(accountSid, authToken);

        await client.messages
            .create({
                body: 'Your reservation is complete!',
                messagingServiceSid: 'MGb3d9b9603dce87f7d71879846d0edbb2',
                to: '+94770251175'
            })
            .then(message => console.log("Twilio Message SID:", message.sid))
            .catch(error => {
                console.error("Twilio Error:", error);
                // Optional: handle notification failure differently if needed
            });

        return {
            success: true,
            message: "Reservation created successfully and seats updated",
            data: {
                reservation: savedReservation,
                updatedSeats,
            },
        };
    } catch (error) {
        console.error("Error creating reservation:", error);

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