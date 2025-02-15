const express = require("express");
const authenticateToken = require("../midddlewares/authenticateToken.js");
const {
  getPublicNutritionInfo,
  getPrivateNutritionInfo,
  addProductToDailyIntake,
  deleteProductFromDailyIntake,
  getDailyIntakeInfo,
} = require("../controllers/nutritionController");

const router = express.Router();

/**
 * @swagger
 * /api/nutrition/public:
 *   get:
 *     summary:  Get public nutrition information
 *     description:  Allows retrieving public nutrition information without requiring authentication.
 *     responses:
 *       200:
 *         description:  Public nutrition information
 *       500:
 *         description: Server error
 */

router.get("/public", getPublicNutritionInfo);

/**
 * @swagger
 * /api/nutrition/private:
 *   get:
 *     summary: Get private nutrition information
 *     description: Allows authenticated users to retrieve private nutrition information.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description:  Private nutrition information
 *       401:
 *         description: Invalid authentication token
 *       500:
 *         description:  Server error
 */

router.get("/private", authenticateToken, getPrivateNutritionInfo);

/**
 * @swagger
 * /api/nutrition/add-product:
 *   post:
 *     summary: Add a product to daily intake
 *     description:  Allows authenticated users to add a product to their daily nutrition intake.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the added product
 *               quantity:
 *                 type: number
 *                 description:Consumed quantity
 *     responses:
 *       201:
 *         description: Product successfully added
 *       400:
 *         description: Invalid request
 *       401:
 *         description:  Invalid authentication token
 *       500:
 *         description: Server error
 */
router.post("/add-product", authenticateToken, addProductToDailyIntake);

/**
 * @swagger
 * /api/nutrition/delete-product:
 *   delete:
 *     summary: Delete a product from daily intake
 *     description: Allows authenticated users to delete a product from their daily nutrition intake.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to be deleted
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Invalid authentication token
 *       500:
 *         description: Server error
 */
router.delete(
  "/delete-product",
  authenticateToken,
  deleteProductFromDailyIntake
);

/**
 * @swagger
 * /api/nutrition/daily/{date}:
 *   get:
 *     summary:Get daily intake information
 *     description: Allows authenticated users to retrieve information about their daily nutrition intake based on the specified date.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date for which daily intake information is retrieved
 *         schema:
 *           type: string
 *           example: '2025-02-09'
 *     responses:
 *       200:
 *         description:  Daily intake information
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Invalid authentication token
 *       500:
 *         description: Server error
 */
router.get("/daily/:date", authenticateToken, getDailyIntakeInfo);

module.exports = router;
