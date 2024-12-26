const express = require("express");
const {
    createReservationController,
    getReservationByIdController,
    updateReservationByIdController,
    deleteReservationByIdController,
    getReservationsByCommuterIdController,
    getReservationsByRouteIdController
} = require("../Controllers/reservationController");

const router = express.Router();

/**
 * @swagger
 * /api/v1/lk/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservation]
 *     description: Add a new reservation with details such as reservedDateTime, listOfSeats, commuter, startLocation, endLocation, and route.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservedDateTime:
 *                 type: string
 *                 format: date-time
 *               listOfSeats:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of seat IDs
 *               commuter:
 *                 type: string
 *                 description: ID of the commuter
 *               startLocation:
 *                 type: string
 *                 description: ID of the start location
 *               endLocation:
 *                 type: string
 *                 description: ID of the end location
 *               route:
 *                 type: string
 *                 description: ID of the route
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Invalid data input
 */
router.post("/", createReservationController);

/**
 * @swagger
 * /api/v1/lk/reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     tags: [Reservation]
 *     description: Retrieve reservation details using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation details retrieved successfully
 *       404:
 *         description: Reservation not found
 */
router.get("/:id", getReservationByIdController);

/**
 * @swagger
 * /api/v1/lk/reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservation]
 *     description: Update reservation details by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *       404:
 *         description: Reservation not found
 */
router.put("/:id", updateReservationByIdController);

/**
 * @swagger
 * /api/v1/lk/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservation]
 *     description: Remove a reservation using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 */
router.delete("/:id", deleteReservationByIdController);

/**
 * @swagger
 * /api/v1/lk/reservations/commuter/{commuterId}:
 *   get:
 *     summary: Get reservations by commuter ID
 *     tags: [Reservation]
 *     description: Retrieve all reservations associated with a specific commuter ID.
 *     parameters:
 *       - in: path
 *         name: commuterId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservations retrieved successfully
 *       404:
 *         description: No reservations found for the commuter
 */
router.get("/commuter/:commuterId", getReservationsByCommuterIdController);

/**
 * @swagger
 * /api/v1/lk/reservations/route/{routeId}:
 *   get:
 *     summary: Get reservations by route ID
 *     tags: [Reservation]
 *     description: Retrieve all reservations associated with a specific route ID.
 *     parameters:
 *       - in: path
 *         name: routeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservations retrieved successfully
 *       404:
 *         description: No reservations found for the route
 */
router.get("/route/:routeId", getReservationsByRouteIdController);

module.exports = router;