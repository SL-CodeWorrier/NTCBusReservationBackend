const express = require("express");
const {
    createPermit,
    getAllPermits,
    getPermitById,
    updatePermitById,
    deletePermitById,
    getPermitByNTCPermitNo,
    getPermitByBusNumber,
    getPermitsByServiceType,
    getPermitsByValidity,
    getPermitsByBusOperatorId,
    getPermitsByRouteId,
} = require("../Controllers/permitController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Permits
 *   description: API endpoints for managing permits
 */

/**
 * @swagger
 * /api/v1/lk/permits:
 *   get:
 *     summary: Get all permits
 *     tags: [Permits]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of permits.
 *       500:
 *         description: Internal server error.
 */
router.get("/", getAllPermits);

/**
 * @swagger
 * /api/v1/lk/permits:
 *   post:
 *     summary: Create a new permit
 *     tags: [Permits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ntcPermitNo:
 *                 type: string
 *                 description: National Transport Commission Permit Number
 *               busNo:
 *                 type: string
 *                 description: Bus number
 *               origin:
 *                 type: string
 *                 description: Origin of the route
 *               serviceType:
 *                 type: string
 *                 description: Type of service
 *               registerDate:
 *                 type: string
 *                 format: date
 *                 description: Date the permit was registered
 *               validity:
 *                 type: string
 *                 format: date
 *                 description: Permit validity date
 *               isValid:
 *                 type: boolean
 *                 description: Indicates if the permit is currently valid
 *               busOperator:
 *                 type: string
 *                 description: ID of the bus operator
 *               route:
 *                 type: string
 *                 description: ID of the route
 *               bus:
 *                 type: string
 *                 description: ID of the bus
 *     responses:
 *       201:
 *         description: Permit created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post("/", createPermit);

/**
 * @swagger
 * /api/v1/lk/permits/{id}:
 *   get:
 *     summary: Get a permit by ID
 *     tags: [Permits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the permit
 *     responses:
 *       200:
 *         description: Successfully retrieved the permit.
 *       404:
 *         description: Permit not found.
 */
router.get("/:id", getPermitById);

/**
 * @swagger
 * /api/v1/lk/permits/{id}:
 *   put:
 *     summary: Update a permit by ID
 *     tags: [Permits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the permit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ntcPermitNo:
 *                 type: string
 *                 description: Updated NTC Permit Number
 *               isValid:
 *                 type: boolean
 *                 description: Updated validity status
 *     responses:
 *       200:
 *         description: Permit updated successfully.
 *       400:
 *         description: Invalid input data.
 */
router.put("/:id", updatePermitById);

/**
 * @swagger
 * /api/v1/lk/permits/{id}:
 *   delete:
 *     summary: Delete a permit by ID
 *     tags: [Permits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the permit
 *     responses:
 *       200:
 *         description: Permit deleted successfully.
 *       404:
 *         description: Permit not found.
 */
router.delete("/:id", deletePermitById);

/**
 * @swagger
 * /api/v1/lk/permits/search/ntc/{ntcPermitNo}:
 *   get:
 *     summary: Get a permit by NTC Permit Number
 *     tags: [Permits]
 *     parameters:
 *       - in: path
 *         name: ntcPermitNo
 *         required: true
 *         schema:
 *           type: string
 *         description: National Transport Commission Permit Number
 *     responses:
 *       200:
 *         description: Successfully retrieved the permit.
 *       404:
 *         description: Permit not found.
 */
router.get("/search/ntc/:ntcPermitNo", getPermitByNTCPermitNo);

/**
 * @swagger
 * /api/v1/lk/permits/search/bus-number/{busNo}:
 *   get:
 *     summary: Get permits by bus number
 *     tags: [Permits]
 *     parameters:
 *       - in: path
 *         name: busNo
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus number to search permits by
 *     responses:
 *       200:
 *         description: Successfully retrieved permits for the bus number.
 *       500:
 *         description: Internal server error.
 */
router.get("/search/bus-number/:busNo", getPermitByBusNumber);

/**
 * @swagger
 * /api/v1/lk/permits/search/service-type/{serviceType}:
 *   get:
 *     summary: Get permits by service type
 *     tags: [Permits]
 *     parameters:
 *       - in: path
 *         name: serviceType
 *         required: true
 *         schema:
 *           type: string
 *         description: The service type to search permits by (e.g., "Express", "Regular")
 *     responses:
 *       200:
 *         description: Successfully retrieved permits for the service type.
 *       500:
 *         description: Internal server error.
 */
router.get("/search/service-type/:serviceType", getPermitsByServiceType);

/**
 * @swagger
 * /api/v1/lk/permits/search/validity/{isValid}:
 *   get:
 *     summary: Get permits by validity status
 *     tags: [Permits]
 *     parameters:
 *       - in: path
 *         name: isValid
 *         required: true
 *         schema:
 *           type: boolean
 *         description: Whether the permit is valid or not (true/false)
 *     responses:
 *       200:
 *         description: Successfully retrieved permits with the specified validity status.
 *       500:
 *         description: Internal server error.
 */
router.get("/search/validity/:isValid", getPermitsByValidity);

/**
 * @swagger
 * /api/v1/lk/permits/search/bus-operator/{busOperatorId}:
 *   get:
 *     summary: Get permits by bus operator ID
 *     tags: [Permits]
 *     parameters:
 *       - in: path
 *         name: busOperatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bus operator to search permits by
 *     responses:
 *       200:
 *         description: Successfully retrieved permits for the bus operator ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/search/bus-operator/:busOperatorId", getPermitsByBusOperatorId);

/**
 * @swagger
 * /api/v1/lk/permits/search/route/{routeId}:
 *   get:
 *     summary: Get permits by route ID
 *     tags: [Permits]
 *     parameters:
 *       - in: path
 *         name: routeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the route to search permits by
 *     responses:
 *       200:
 *         description: Successfully retrieved permits for the route ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/search/route/:routeId", getPermitsByRouteId);

module.exports = router;