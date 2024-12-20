const express = require("express");
const router = express.Router();
const { getTimetablesByBusId } = require("../Controllers/timeTableController");

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
 *                         example: "10:00 AM"
 *                       departureTime:
 *                         type: string
 *                         example: "10:30 AM"
 *                       arrivalTimeOnDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-19T10:05:00Z"
 *                       departureTimeOnDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-19T10:35:00Z"
 *       404:
 *         description: No timetable found for the specified bus ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/time-table/bus/:busId", getTimetablesByBusId);

module.exports = router;