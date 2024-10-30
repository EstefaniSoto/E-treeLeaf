const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sql } = require('../db/db');
require('dotenv').config({path: '.env'})
const router = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a los usuarios iniciar sesión con su correo y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               user_password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para la autenticación
 *                 rol:
 *                   type: string
 *                   description: Rol del usuario (Básico o Administrativo)
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */

// Ruta para inicio de sesión
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Realiza la consulta para buscar al usuario por email usando parámetros
    const pool = await sql.connect();
    const result = await pool.request()
      .input('email', sql.VarChar, email) // declarando el parámetro 'email'
      .query('SELECT * FROM usuarios WHERE email = @email'); // Usando el parámetro '@email'

    // Verifica si hay un resultado
    if (!result.recordset || result.recordset.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user = result.recordset[0];
    // Verifica la contraseña
    const isPasswordValid = bcrypt.compareSync(password, user.user_password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crea el JWT incluyendo el rol del usuario
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Devuelve el token, el rol y el id
    return res.status(200).json({ token, rol: user.rol, id: user.id });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

module.exports = router;
