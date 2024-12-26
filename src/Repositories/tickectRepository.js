const Ticket = require("../Models/ticketModel");

// Retrieve a seat by its number
const getTicketById = async (id) => {

    try {
        const ticket = await Ticket.findById(id)
                                .populate("Seat")
                                .populate("Bus")
                                .populate("Route")
                                .populate("Reservation");
        if (ticket == null) {
            return {
                success: false,
                message: "Ticket not found",
            };
        }
        return {
            success: true,
            message: "Ticket retrieved successfully",
            data: seat,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve seat: ${error.message}`,
        };
    }
};

const getTicketsByReservationId = async (reservationId) => {

    try {
        const tickets = await Ticket.find({ Reservation: reservationId })
                                .populate("Seat")
                                .populate("Bus")
                                .populate("Route")
                                .populate("Reservation");
                                
        if (tickets.length == 0) {
            return {
                success: false,
                message: "Tickets not found",
            };
        }
        return {
            success: true,
            message: "Tickets retrieved successfully",
            data: seat,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve seat: ${error.message}`,
        };
    }
};

module.exports = {
    getTicketById,
    getTicketsByReservationId
};