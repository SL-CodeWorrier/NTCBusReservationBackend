const express = require('express');
const { getAll } = require('../Controllers/routeAvailabilityController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RouteAvailability
 *   description: API to manage route availability
 */

/**
 * @swagger
 * /api/v1/lk/routes-availability:
 *   get:
 *     summary: Get all route availabilities
 *     description: Retrieve all route availability data. Optionally filter by availability status.
 *     tags: [RouteAvailability]
 *     parameters:
 *       - in: query
 *         name: isAvailable
 *         schema:
 *           type: boolean
 *         description: Filter routes by availability status (true for available, false for unavailable)
 *     responses:
 *       200:
 *         description: Successfully retrieved route availabilities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       isAvailable:
 *                         type: boolean
 *                       closedDateTime:
 *                         type: string
 *                         format: date-time
 *                       openDateTime:
 *                         type: string
 *                         format: date-time
 *                       route:
 *                         type: string
 *                         description: The associated route ID
 *       400:
 *         description: Invalid query parameters or bad request
 *       500:
 *         description: Internal server error
 */
router.get('/', getAll);

module.exports = router;