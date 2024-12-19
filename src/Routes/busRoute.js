const express = require('express');
const {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
    getByBusNumber,
    getByAvailability,
    getByCTBorPrivate,
    getByValidate,
    getByBusOperatorId,
    getByRouteId,
} = require('../Controllers/busController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: API for managing buses
 */

/**
 * @swagger
 * /api/v1/lk/buses:
 *   get:
 *     summary: Retrieve all buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of buses.
 *       500:
 *         description: An error occurred on the server.
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/v1/lk/buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busRegNumber:
 *                 type: string
 *               isAvailable:
 *                 type: boolean
 *               isCTBorPrivate:
 *                 type: boolean
 *               isValidated:
 *                 type: boolean
 *               isACorNonAC:
 *                 type: boolean
 *               busOperator:
 *                 type: string
 *               route:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bus created successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: An error occurred on the server.
 */
router.post('/', create);

/**
 * @swagger
 * /api/v1/lk/buses/{id}:
 *   get:
 *     summary: Retrieve a bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the bus.
 *       404:
 *         description: Bus not found.
 *       500:
 *         description: An error occurred on the server.
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/v1/lk/buses/{id}:
 *   put:
 *     summary: Update a bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Bus updated successfully.
 *       404:
 *         description: Bus not found.
 *       500:
 *         description: An error occurred on the server.
 */
router.put('/:id', updateById);

/**
 * @swagger
 * /api/v1/lk/buses/{id}:
 *   delete:
 *     summary: Delete a bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus ID
 *     responses:
 *       200:
 *         description: Bus deleted successfully.
 *       404:
 *         description: Bus not found.
 *       500:
 *         description: An error occurred on the server.
 */
router.delete('/:id', deleteById);

/**
 * @swagger
 * /api/v1/lk/buses/search/by-bus-number:
 *   get:
 *     summary: Search buses by registration number
 *     tags: [Buses]
 *     parameters:
 *       - in: query
 *         name: busRegNumber
 *         schema:
 *           type: string
 *         description: The registration number of the bus
 *     responses:
 *       200:
 *         description: Successfully retrieved matching buses.
 *       404:
 *         description: No buses found with the given registration number.
 *       500:
 *         description: An error occurred on the server.
 */
router.get('/search/by-bus-number', getByBusNumber);

/**
 * @swagger
 * /api/v1/lk/buses/search/by-availability:
 *   get:
 *     summary: Search buses by availability
 *     tags: [Buses]
 *     parameters:
 *       - in: query
 *         name: isAvailable
 *         schema:
 *           type: boolean
 *         description: Availability status of the bus
 *     responses:
 *       200:
 *         description: Successfully retrieved matching buses.
 *       404:
 *         description: No buses found with the given availability status.
 *       500:
 *         description: An error occurred on the server.
 */
router.get('/search/by-availability', getByAvailability);

/**
 * @swagger
 * /api/v1/lk/buses/search/by-ctb-private:
 *   get:
 *     summary: Search buses by type (CTB/Private)
 *     tags: [Buses]
 *     parameters:
 *       - in: query
 *         name: isCTBorPrivate
 *         schema:
 *           type: boolean
 *         description: Type of the bus (CTB or Private)
 *     responses:
 *       200:
 *         description: Successfully retrieved matching buses.
 *       404:
 *         description: No buses found with the given type.
 *       500:
 *         description: An error occurred on the server.
 */
router.get('/search/by-ctb-private', getByCTBorPrivate);

/**
 * @swagger
 * /api/v1/lk/buses/search/by-validation:
 *   get:
 *     summary: Search buses by validation status
 *     tags: [Buses]
 *     parameters:
 *       - in: query
 *         name: isValidated
 *         schema:
 *           type: boolean
 *         description: Validation status of the bus
 *     responses:
 *       200:
 *         description: Successfully retrieved matching buses.
 *       404:
 *         description: No buses found with the given validation status.
 *       500:
 *         description: An error occurred on the server.
 */
router.get('/search/by-validation', getByValidate);

module.exports = router;