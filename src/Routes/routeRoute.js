const express = require("express");
const routeController = require("../Controllers/routeController");

const router = express.Router();

/**
 * @swagger
 * /api/v1/lk/routes:
 *   post:
 *     summary: Create a new route
 *     tags: [Route]
 *     description: Create a new route with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               routeNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", routeController.create);

/**
 * @swagger
 * /api/v1/lk/routes/{id}:
 *   get:
 *     summary: Get a route by ID
 *     tags: [Route]
 *     description: Retrieve the route details by route ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the route
 *     responses:
 *       200:
 *         description: Successfully retrieved route
 *       404:
 *         description: Route not found
 */
router.get("/:id", routeController.getById);

/**
 * @swagger
 * /api/v1/lk/routes:
 *   get:
 *     summary: Get all routes
 *     tags: [Route]
 *     description: Retrieve a list of all routes.
 *     responses:
 *       200:
 *         description: Successfully retrieved routes
 *       500:
 *         description: Failed to retrieve routes
 */
router.get("/", routeController.getAll);

/**
 * @swagger
 * /api/v1/lk/routes/{id}:
 *   put:
 *     summary: Update a route by ID
 *     tags: [Route]
 *     description: Update the route information by route ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeNumber:
 *                 type: string
 *               startLocation:
 *                 type: string
 *               endLocation:
 *                 type: string
 *               description:
 *                 type: string
 *               distance:
 *                 type: number
 *                 format: float
 *               estimatedTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated route
 *       404:
 *         description: Route not found
 */
router.put("/:id", routeController.update);

/**
 * @swagger
 * /api/v1/lk/routes/{id}:
 *   delete:
 *     summary: Delete a route by ID
 *     tags: [Route]
 *     description: Delete the route by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the route
 *     responses:
 *       200:
 *         description: Successfully deleted route
 *       404:
 *         description: Route not found
 */
router.delete("/:id", routeController.deleteById);

/**
 * @swagger
 * /api/v1/lk/routes/number/{routeNumber}:
 *   get:
 *     summary: Get a route by route number
 *     tags: [Route]
 *     description: Retrieve a route's details by its route number.
 *     parameters:
 *       - in: path
 *         name: routeNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The route number to search for
 *     responses:
 *       200:
 *         description: Successfully retrieved route by number
 *       404:
 *         description: Route not found
 */
router.get("/number/:routeNumber", routeController.getByNumber);

module.exports = router;