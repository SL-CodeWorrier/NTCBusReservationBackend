const express = require("express");
const router = express.Router();
const {
    createPayment,
    addReservationId,
    deletePaymentsByCommuterId,
    getPaymentsByReservationId,
    getPaymentsByCommuterId,
} = require("../Controllers/paymentController");

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management API
 */

/**
 * @swagger
 * /api/v1/lk/payment:
 *   post:
 *     summary: Create a payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paidDateTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-20T10:30:00Z
 *               reservationId:
 *                 type: string
 *                 example: 647acbd5f99b70f34e12f678
 *               amountForOneSeat:
 *                 type: number
 *                 example: 150
 *               commuter:
 *                 type: string
 *                 example: 647acbd5f99b70f34e12f123
 *     responses:
 *       201:
 *         description: Payment created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post("/", createPayment);

/**
 * @swagger
 * /api/v1/lk/payment/commuter/{commuterId}:
 *   delete:
 *     summary: Delete payments by commuter ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: commuterId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the commuter
 *     responses:
 *       200:
 *         description: Payments deleted successfully.
 *       404:
 *         description: No payments found for the given commuter ID.
 *       500:
 *         description: Internal server error.
 */
router.delete("/commuter/:commuterId", deletePaymentsByCommuterId);

/**
 * @swagger
 * /api/v1/lk/payment/reservation/{reservationId}:
 *   get:
 *     summary: Get payments by reservation ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the reservation
 *     responses:
 *       200:
 *         description: Payments retrieved successfully.
 *       404:
 *         description: No payments found for the given reservation ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/reservation/:reservationId", getPaymentsByReservationId);

/**
 * @swagger
 * /api/v1/lk/payment/commuter/{commuterId}:
 *   get:
 *     summary: Get payments by commuter ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: commuterId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the commuter
 *     responses:
 *       200:
 *         description: Payments retrieved successfully.
 *       404:
 *         description: No payments found for the given commuter ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/commuter/:commuterId", getPaymentsByCommuterId);

/**
 * @swagger
 * /api/v1/lk/payment/{paymentId}/reservation:
 *   patch:
 *     summary: Add or update a reservation ID for a payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservationId:
 *                 type: string
 *                 example: 647acbd5f99b70f34e12f678
 *     responses:
 *       200:
 *         description: Reservation ID added successfully.
 *       404:
 *         description: Payment not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/:paymentId/reservation", addReservationId);

module.exports = router;