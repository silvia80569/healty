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
 *     summary: Înregistrare utilizator
 *     description: Permite unui utilizator să se înregistreze în aplicație.
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
 *         description: Utilizator înregistrat cu succes
 *       400:
 *         description: Cerere invalidă
 */

router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentificare utilizator
 *     description: Permite unui utilizator să se autentifice în aplicație.
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
 *         description: Autentificare reușită, token de autentificare returnat
 *       401:
 *         description: Date de autentificare invalide
 */

router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Deconectare utilizator
 *     description: Permite unui utilizator să se deconecteze din aplicație, invalidând token-ul.
 *     security:
 *       - bearerAuth: []  // Dacă folosești autentificare pe bază de token
 *     responses:
 *       200:
 *         description: Utilizator deconectat cu succes
 *       401:
 *         description: Utilizator neautentificat
 */

router.post("/logout", authenticateToken, logoutUser);

module.exports = router;
