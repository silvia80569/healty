const express = require('express');
const authenticateToken = require('../midddlewares/authenticateToken.js');
const { getPublicNutritionInfo,
  getPrivateNutritionInfo,
  addProductToDailyIntake,
  deleteProductFromDailyIntake,
  getDailyIntakeInfo
} = require('../controllers/nutritionController');

const router = express.Router();

/**
 * @swagger
 * /api/nutrition/public:
 *   get:
 *     summary: Obține informații publice despre nutriție
 *     description: Permite obținerea informațiilor publice despre nutriție, fără a necesita autentificare.
 *     responses:
 *       200:
 *         description: Informațiile nutriționale publice
 *       500:
 *         description: Eroare server
 */

router.get('/public', getPublicNutritionInfo);

/**
 * @swagger
 * /api/nutrition/private:
 *   get:
 *     summary: Obține informații private despre nutriție
 *     description: Permite obținerea informațiilor despre nutriție pentru utilizatori autentificați.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informațiile nutriționale private
 *       401:
 *         description: Token de autentificare invalid
 *       500:
 *         description: Eroare server
 */

router.get('/private', authenticateToken, getPrivateNutritionInfo);

/**
 * @swagger
 * /api/nutrition/add-product:
 *   post:
 *     summary: Adaugă un produs în aportul zilnic
 *     description: Permite utilizatorilor autentificați să adauge un produs în aportul zilnic de nutriție.
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
 *                 description: ID-ul produsului adăugat
 *               quantity:
 *                 type: number
 *                 description: Cantitatea consumată
 *     responses:
 *       201:
 *         description: Produs adăugat cu succes
 *       400:
 *         description: Cerere invalidă
 *       401:
 *         description: Token de autentificare invalid
 *       500:
 *         description: Eroare server
 */
router.post('/add-product', authenticateToken, addProductToDailyIntake);

/**
 * @swagger
 * /api/nutrition/delete-product:
 *   delete:
 *     summary: Șterge un produs din aportul zilnic
 *     description: Permite utilizatorilor autentificați să șteargă un produs din aportul zilnic de nutriție.
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
 *                 description: ID-ul produsului care trebuie șters
 *     responses:
 *       200:
 *         description: Produs șters cu succes
 *       400:
 *         description: Cerere invalidă
 *       401:
 *         description: Token de autentificare invalid
 *       500:
 *         description: Eroare server
 */
router.delete('/delete-product', authenticateToken, deleteProductFromDailyIntake);

/**
 * @swagger
 * /api/nutrition/daily/{date}:
 *   get:
 *     summary: Obține informații despre aportul zilnic
 *     description: Permite utilizatorilor autentificați să obțină informații despre aportul zilnic de nutriție, pe baza datei.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         description: Data pentru care se obțin informațiile despre aportul zilnic
 *         schema:
 *           type: string
 *           example: '2025-02-09'
 *     responses:
 *       200:
 *         description: Informațiile aportului zilnic
 *       400:
 *         description: Cerere invalidă
 *       401:
 *         description: Token de autentificare invalid
 *       500:
 *         description: Eroare server
 */
router.get('/daily/:date', authenticateToken, getDailyIntakeInfo);

module.exports = router;
