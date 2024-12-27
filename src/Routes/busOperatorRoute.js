const express = require('express');
const {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
    getByPhoneNumber,
    getByUserId,
} = require('../Controllers/busOperatorController');  // Adjust path as needed

const router = express.Router();

/**
 * @swagger
 * /api/v1/lk/bus-operators:
 *   post:
 *     summary: Create a new bus operator
 *     tags: [Bus Operator]
 *     description: Create a new bus operator with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessPhoneNumber:
 *                 type: string
 *               isWorkingProfile:
 *                 type: boolean
 *               operatorNumber:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bus operator created successfully
 *       400:
 *         description: Bad request, invalid input
 */
router.post('/', create);

/**
 * @swagger
 * /api/v1/lk/bus-operators:
 *   get:
 *     summary: Get all bus operators
 *     tags: [Bus Operator]
 *     description: Retrieve a list of all bus operators.
 *     responses:
 *       200:
 *         description: Successfully retrieved bus operators
 *       500:
 *         description: Failed to retrieve bus operators
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/v1/lk/bus-operators/{id}:
 *   get:
 *     summary: Get a bus operator by ID
 *     tags: [Bus Operator]
 *     description: Retrieve a bus operator's details by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bus operator
 *     responses:
 *       200:
 *         description: Successfully retrieved bus operator
 *       404:
 *         description: Bus operator not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/v1/lk/bus-operators/{id}:
 *   put:
 *     summary: Update a bus operator by ID
 *     tags: [Bus Operator]
 *     description: Update a bus operator's information by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bus operator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated bus operator
 *       404:
 *         description: Bus operator not found
 */
router.put('/:id', updateById);

/**
 * @swagger
 * /api/v1/lk/bus-operators/{id}:
 *   delete:
 *     summary: Delete a bus operator by ID
 *     tags: [Bus Operator]
 *     description: Delete a bus operator from the database by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bus operator
 *     responses:
 *       200:
 *         description: Successfully deleted bus operator
 *       404:
 *         description: Bus operator not found
 */
router.delete('/:id', deleteById);

/**
 * @swagger
 * /api/v1/lk/bus-operators/phone/{phoneNumber}:
 *   get:
 *     summary: Get a bus operator by phone number
 *     tags: [Bus Operator]
 *     description: Retrieve a bus operator's details by their phone number.
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The phone number to search for
 *     responses:
 *       200:
 *         description: Successfully retrieved bus operator by phone number
 *       404:
 *         description: Bus operator not found
 */
router.get('/phone/:phoneNumber', getByPhoneNumber);

/**
 * @swagger
 * /api/v1/lk/bus-operators/user/{userId}:
 *   get:
 *     summary: Get a bus operator by user ID
 *     tags: [Bus Operator]
 *     description: Retrieve a bus operator's details by their user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID to search for
 *     responses:
 *       200:
 *         description: Successfully retrieved bus operator by user ID
 *       404:
 *         description: Bus operator not found
 */
router.get('/user/:userId', getByUserId);

module.exports = router;