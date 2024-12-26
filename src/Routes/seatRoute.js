const express = require("express");
const router = express.Router();
const {
    getSeatByNumberController,
    getSeatsByBusIdController,
    getAllSeatsByBusIdController,
    createSeatForBus
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
 *       - in: query
 *         name: busRegNumber
 *         required: false
 *         schema:
 *           type: string
 *         description: The bus registration number to filter the seat by
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
router.get("/number/:number", getSeatByNumberController);

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
router.get("/bus/:busId", getSeatsByBusIdController);

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
router.get("/all/:busId", getAllSeatsByBusIdController);

/**
 * @swagger
 * /api/v1/lk/seat:
 *   post:
 *     summary: Create a new seat for a bus
 *     tags: [Seat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: The seat number
 *                 example: "A1"
 *               isAvailable:
 *                 type: boolean
 *                 description: Availability status of the seat
 *                 example: true
 *               isBookingInProgress:
 *                 type: boolean
 *                 description: Indicates if the seat booking is in progress
 *                 example: false
 *               isWindowSeat:
 *                 type: boolean
 *                 description: Indicates if the seat is a window seat
 *                 example: true
 *               busId:
 *                 type: string
 *                 description: The ID of the bus that the seat belongs to
 *                 example: "507f191e810c19729de860ea"
 *     responses:
 *       201:
 *         description: Successfully created the seat.
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
 *                   example: "Seat created successfully"
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
 *                     busId:
 *                       type: string
 *                       example: "507f191e810c19729de860ea"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-25T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-25T12:00:00Z"
 *       400:
 *         description: Missing required fields in the request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Please provide all required fields: number, isAvailable, isBookingInProgress, isWindowSeat, busId"
 *       500:
 *         description: An error occurred while creating the seat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the Seat."
 */
router.post('/', createSeatForBus);

module.exports = router;