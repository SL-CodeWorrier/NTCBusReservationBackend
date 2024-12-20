const express = require("express");
const router = express.Router();
const {
    getSeatByNumberController,
    getSeatsByBusIdController,
    getAllSeatsByBusIdController
} = require("../Controllers/seatController");

/**
 * @swagger
 * /api/v1/lk/seat/number/{number}:
 *   get:
 *     summary: Get seat by seat number
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: string
 *         description: The seat number to retrieve the seat details
 *     responses:
 *       200:
 *         description: Successfully retrieved seat details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Seat details retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     number:
 *                       type: string
 *                       example: "A1"
 *                     isAvailable:
 *                       type: boolean
 *                       example: true
 *                     isBookingInProgress:
 *                       type: boolean
 *                       example: false
 *                     isWindowSeat:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Seat not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/seat/number/:number", getSeatByNumberController);

/**
 * @swagger
 * /api/v1/lk/seat/bus/{busId}:
 *   get:
 *     summary: Get seats by Bus ID with optional filters
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Bus ID to retrieve seats for
 *       - in: query
 *         name: isAvailable
 *         schema:
 *           type: boolean
 *         description: Filter seats by availability (true/false)
 *       - in: query
 *         name: isBookingInProgress
 *         schema:
 *           type: boolean
 *         description: Filter seats by booking status (true/false)
 *       - in: query
 *         name: isWindowSeat
 *         schema:
 *           type: boolean
 *         description: Filter seats by window seat status (true/false)
 *     responses:
 *       200:
 *         description: Successfully retrieved seats for the bus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Seats retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       number:
 *                         type: string
 *                         example: "A1"
 *                       isAvailable:
 *                         type: boolean
 *                         example: true
 *                       isBookingInProgress:
 *                         type: boolean
 *                         example: false
 *                       isWindowSeat:
 *                         type: boolean
 *                         example: true
 *       404:
 *         description: No seats found for the specified Bus ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/seat/bus/:busId", getSeatsByBusIdController);

/**
 * @swagger
 * /api/v1/lk/seat/all/{busId}:
 *   get:
 *     summary: Get all seats by Bus ID
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Bus ID to retrieve all seats for
 *     responses:
 *       200:
 *         description: Successfully retrieved all seats for the bus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All seats retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       number:
 *                         type: string
 *                         example: "A1"
 *                       isAvailable:
 *                         type: boolean
 *                         example: true
 *                       isBookingInProgress:
 *                         type: boolean
 *                         example: false
 *                       isWindowSeat:
 *                         type: boolean
 *                         example: true
 *       404:
 *         description: No seats found for the specified Bus ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/seat/all/:busId", getAllSeatsByBusIdController);

module.exports = router;