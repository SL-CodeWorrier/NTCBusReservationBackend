const express = require("express");
const {
    create,
    getLocationByRouteNo,
    getLocationByLocationName
} = require("../Controllers/locationController");

const router = express.Router();

/**
 * @swagger
 * /api/v1/lk/locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Location]
 *     description: Create a new location record with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Name of the location
 *               route:
 *                 type: string
 *                 description: ID of the associated route
 *     responses:
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Bad request, invalid input
 */
router.post("/", create);

/**
 * @swagger
 * /api/v1/lk/locations/route/{routeNo}:
 *   get:
 *     summary: Get locations by route number
 *     tags: [Location]
 *     description: Retrieve locations associated with a specific route number.
 *     parameters:
 *       - in: path
 *         name: routeNo
 *         required: true
 *         schema:
 *           type: string
 *         description: The route number to filter locations by
 *     responses:
 *       200:
 *         description: Successfully retrieved locations
 *       400:
 *         description: Bad request, invalid route number
 *       404:
 *         description: No locations found for the route number
 */
router.get("/route/:routeNo", getLocationByRouteNo);

/**
 * @swagger
 * /api/v1/lk/locations/name/{name}:
 *   get:
 *     summary: Get locations by name
 *     tags: [Location]
 *     description: Retrieve locations that match a specific name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the location to filter by
 *     responses:
 *       200:
 *         description: Successfully retrieved locations
 *       400:
 *         description: Bad request, invalid name
 *       404:
 *         description: No locations found with the specified name
 */
router.get("/name/:name", getLocationByLocationName);

module.exports = router;