const express = require('express');
const { register, login } = require('../Controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/lk/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a user with username, password, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phonenumber:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Registration failed
 */
router.post("/register", register);

/**
 * @swagger
 * /api/v1/lk/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credential:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Login failed
 */
router.post("/login", login);

module.exports = router;