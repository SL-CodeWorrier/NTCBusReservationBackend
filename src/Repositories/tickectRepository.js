const Ticket = require("../Models/ticketModel");

// Retrieve a seat by its number
const getTicketById = async (id) => {

    try {
        const ticket = await Ticket.findById(id).populate("seat bus timeTable route reservation");

        if (ticket == null) {
            return {
                success: false,
                message: "Ticket not found",
            };
        }
        return {
            success: true,
            message: "Ticket retrieved successfully",
            data: ticket,
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
        const tickets = (await Ticket.find().populate("seat bus timeTable route reservation")).filter(ticket => ticket.reservation._id == reservationId);
                        
        if (tickets.length == 0) {
            return {
                success: false,
                message: "Tickets not found",
            };
        }
        return {
            success: true,
            message: "Tickets retrieved successfully",
            data: tickets,
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