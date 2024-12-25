const express = require("express");
const router = express.Router();
const { getTimetablesByBusId, AddTimeForBus } = require("../Controllers/timeTableController");

/**
 * @swagger
 * /api/v1/lk/time-table/bus/{busId}:
 *   get:
 *     summary: Get timetable by Bus ID
 *     tags: [TimeTable]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bus to retrieve its timetable
 *     responses:
 *       200:
 *         description: Successfully retrieved timetables for the bus.
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
 *                   example: "Timetable retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       arrivalTime:
 *                         type: string
 *                         description: Scheduled arrival time
 *                         example: "08:30 AM"
 *                       departureTime:
 *                         type: string
 *                         description: Scheduled departure time
 *                         example: "09:00 AM"
 *                       bus:
 *                         type: string
 *                         description: The ID of the bus
 *                         example: "64ab1cd2e8d7e11a9c5f77e2"
 *                       location:
 *                         type: string
 *                         description: The ID of the location
 *                         example: "64cb3ed4f7b6e22a9d8e77e3"
 *       404:
 *         description: No timetable found for the specified bus ID.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/v1/lk/time-table/bus:
 *   post:
 *     summary: Create a new timetable for a bus
 *     tags: [TimeTable]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               arrivalTime:
 *                 type: string
 *                 description: Scheduled arrival time
 *                 example: "08:30 AM"
 *               departureTime:
 *                 type: string
 *                 description: Scheduled departure time
 *                 example: "09:00 AM"
 *               busId:
 *                 type: string
 *                 description: The ID of the bus
 *                 example: "64ab1cd2e8d7e11a9c5f77e2"
 *               locationId:
 *                 type: string
 *                 description: The ID of the location
 *                 example: "64cb3ed4f7b6e22a9d8e77e3"
 *     responses:
 *       200:
 *         description: Successfully created a timetable for the bus.
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
 *                   example: "Timetable created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     arrivalTime:
 *                       type: string
 *                       example: "08:30 AM"
 *                     departureTime:
 *                       type: string
 *                       example: "09:00 AM"
 *                     bus:
 *                       type: string
 *                       example: "64ab1cd2e8d7e11a9c5f77e2"
 *                     location:
 *                       type: string
 *                       example: "64cb3ed4f7b6e22a9d8e77e3"
 *                     _id:
 *                       type: string
 *                       example: "64f7e1d7e1d3e722fbaef9e3"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-25T12:34:56.789Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-25T12:34:56.789Z"
 *       400:
 *         description: Bad request due to missing required fields or invalid IDs.
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
 *                   example: "Invalid busId or locationId format."
 *       404:
 *         description: The requested resource was not found (e.g., failed to create timetable).
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
 *                   example: "Failed to create timetable: <error_message>"
 *       500:
 *         description: Internal server error.
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
 *                   example: "An error occurred: <error_message>"
 */
router.get("/bus/:busId", getTimetablesByBusId);
router.post("/bus", AddTimeForBus);

module.exports = router;