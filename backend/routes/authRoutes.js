const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const authenticateToken = require("../midddlewares/authenticateToken.js");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     description:  Allows a user to register in the application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid request
 */

router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User authentication
 *     description: Allows a user to authenticate in the application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful authentication, authentication token returned
 *       401:
 *         description: Invalid authentication credentials
 */

router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     description: AlLows a user to log out of the application, invalidating the token.
 *     security:
 *       - bearerAuth: []  // If using token-besed authentication
 *     responses:
 *       200:
 *         description: User successfully logged out
 *       401:
 *         description: Unauthorized user
 */

router.post("/logout", authenticateToken, logoutUser);

module.exports = router;
