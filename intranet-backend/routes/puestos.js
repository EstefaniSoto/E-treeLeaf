const express = require('express');
const { sql } = require('../db/db');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Puestos
 *   description: API para gestionar puestos
 */

/**
 * @swagger
 * /api/puestos:
 *   get:
 *     summary: Obtener todos los puestos
 *     tags: [Puestos]
 *     responses:
 *       200:
 *         description: Lista de puestos
 *       500:
 *         description: Error al obtener puestos
 */
router.get('/', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM puestos`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener puestos:', err);
        res.status(500).send('Error al obtener puestos');
    }
});

module.exports = router;
