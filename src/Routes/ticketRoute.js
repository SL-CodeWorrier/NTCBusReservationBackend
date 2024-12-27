const express = require("express");
const {
    getTicketByTicketId,
    getTicketsByTicketReservationId
} = require("../Controllers/ticketController");

const router = express.Router();

/**
 * @swagger
 * /api/v1/lk/tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Ticket]
 *     description: Retrieve ticket details using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ticket ID
 *     responses:
 *       200:
 *         description: Ticket details retrieved successfully
 *       404:
 *         description: Ticket not found
 */
router.get("/:id", getTicketByTicketId);

/**
 * @swagger
 * /api/v1/lk/tickets/reservation/{reservationId}:
 *   get:
 *     summary: Get tickets by reservation ID
 *     tags: [Ticket]
 *     description: Retrieve all tickets associated with a specific reservation ID.
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *           description: The reservation ID
 *     responses:
 *       200:
 *         description: Tickets retrieved successfully
 *       404:
 *         description: No tickets found for the reservation
 */
router.get("/reservation/:reservationId", getTicketsByTicketReservationId);

module.exports = router;