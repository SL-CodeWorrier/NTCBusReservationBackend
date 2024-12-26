const express = require('express');
const { register, login, verify, forgot, reset, update, remove } = require('../Controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/lk/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
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
 *     tags: [Authentication]
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

/**
 * @swagger
 * /api/v1/lk/auth/verify:
 *   post:
 *     summary: Verify a user
 *     tags: [Authentication]
 *     description: Verify a user by phone number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phonenumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: User verified successfully
 *       404:
 *         description: User not found
 */
router.post("/verify", verify);

/**
 * @swagger
 * /api/v1/lk/auth/forgot:
 *   post:
 *     summary: Forgot password
 *     tags: [Authentication]
 *     description: Generate a password reset token for the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phonenumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset token generated
 *       404:
 *         description: User not found
 */
router.post("/forgot", forgot);

/**
 * @swagger
 * /api/v1/lk/auth/reset:
 *   post:
 *     summary: Reset password
 *     tags: [Authentication]
 *     description: Reset the password using the token and new password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token or input
 */
router.post("/reset", reset);

/**
 * @swagger
 * /api/v1/lk/auth/update/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Authentication]
 *     description: Update details of a user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updates:
 *                 type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/update/:id", update);

/**
 * @swagger
 * /api/v1/lk/auth/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Authentication]
 *     description: Delete a user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/delete/:id", remove);

module.exports = router;