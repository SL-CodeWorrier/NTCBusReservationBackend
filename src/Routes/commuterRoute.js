const express = require("express");
const {
    createCommuter,
    getAllCommuters,
    getCommuterById,
    updateCommuterById,
    deleteCommuterById,
    getCommutersByProvince,
    getCommutersByCity,
    getCommuterByPhoneNumberOrEmail,
} = require("../Controllers/commuterController");

const router = express.Router();

/**
 * @swagger
 * /api/v1/lk/commuter/create:
 *   post:
 *     summary: Create a new commuter
 *     description: Create a new commuter with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               addressNo:
 *                 type: string
 *               addressFirstLine:
 *                 type: string
 *               addressSecondLine:
 *                 type: string
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commuter created successfully
 *       400:
 *         description: Bad request, invalid input
 */
router.post('/create', createCommuter);

/**
 * @swagger
 * /api/v1/lk/commuter:
 *   get:
 *     summary: Get all commuters
 *     description: Retrieve a list of all commuters.
 *     responses:
 *       200:
 *         description: Successfully retrieved commuters
 *       500:
 *         description: Failed to retrieve commuters
 */
router.get('/', getAllCommuters);

/**
 * @swagger
 * /api/v1/lk/commuter/{id}:
 *   get:
 *     summary: Get a commuter by ID
 *     description: Retrieve a commuter's details by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the commuter
 *     responses:
 *       200:
 *         description: Successfully retrieved commuter
 *       404:
 *         description: Commuter not found
 */
router.get('/:id', getCommuterById);

/**
 * @swagger
 * /api/v1/lk/commuter/{id}:
 *   put:
 *     summary: Update a commuter by ID
 *     description: Update a commuter's information by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the commuter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               addressNo:
 *                 type: string
 *               addressFirstLine:
 *                 type: string
 *               addressSecondLine:
 *                 type: string
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated commuter
 *       404:
 *         description: Commuter not found
 */
router.put('/:id', updateCommuterById);

/**
 * @swagger
 * /api/v1/lk/commuter/{id}:
 *   delete:
 *     summary: Delete a commuter by ID
 *     description: Delete a commuter from the database by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the commuter
 *     responses:
 *       200:
 *         description: Successfully deleted commuter
 *       404:
 *         description: Commuter not found
 */
router.delete('/:id', deleteCommuterById);

/**
 * @swagger
 * /api/v1/lk/commuter/province/{province}:
 *   get:
 *     summary: Get commuters by province
 *     description: Retrieve a list of commuters in a specific province.
 *     parameters:
 *       - in: path
 *         name: province
 *         schema:
 *           type: string
 *         required: true
 *         description: The province to filter by
 *     responses:
 *       200:
 *         description: Successfully retrieved commuters by province
 */
router.get('/province/:province', getCommutersByProvince);

/**
 * @swagger
 * /api/v1/lk/commuter/city/{city}:
 *   get:
 *     summary: Get commuters by city
 *     description: Retrieve a list of commuters in a specific city.
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city to filter by
 *     responses:
 *       200:
 *         description: Successfully retrieved commuters by city
 */
router.get('/city/:city', getCommutersByCity);

/**
 * @swagger
 * /api/v1/lk/commuter/credential/{credential}:
 *   get:
 *     summary: Get commuter by phone number or email
 *     description: Retrieve a commuter's details by their phone number or email.
 *     parameters:
 *       - in: path
 *         name: credential
 *         schema:
 *           type: string
 *         required: true
 *         description: The phone number or email to search for
 *     responses:
 *       200:
 *         description: Successfully retrieved commuter
 *       404:
 *         description: Commuter not found
 */
router.get('/credential/:credential', getCommuterByPhoneNumberOrEmail);

module.exports = router;