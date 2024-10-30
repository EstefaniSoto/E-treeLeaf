const express = require('express');
const { sql } = require('../db/db');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departamentos
 *   description: API para gestionar departamentos
 */

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     summary: Obtener todos los departamentos
 *     tags: [Departamentos]
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *       500:
 *         description: Error al obtener departamentos
 */
router.get('/', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM departamentos`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener departamentos:', err);
        res.status(500).send('Error al obtener departamentos');
    }
});

module.exports = router;
