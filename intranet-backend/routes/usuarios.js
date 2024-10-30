const express = require('express');
const bcrypt = require('bcryptjs');
const { sql } = require('../db/db');
const multer = require('multer');
const router = express.Router();
const saltRounds = 10;
const storage = multer.memoryStorage(); // Almacena en memoria
const upload = multer({ storage: storage }); // Crea un middleware de Multer

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error al obtener usuarios
 */
router.get('/', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Usuarios`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener usuarios:', err.message);
        res.status(500).send('Error al obtener usuarios');
    }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a obtener
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener usuario
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM usuarios WHERE id = ${id}`;
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error('Error al obtener usuario:', err);
        res.status(500).send('Error al obtener usuario');
    }
});

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               tel:
 *                 type: string
 *               puesto_id:
 *                 type: integer
 *               rol:
 *                 type: string
 *               departamento_id:
 *                 type: integer
 *               jefe_directo_id:
 *                 type: integer
 *               subordinado_id:
 *                 type: integer
 *               imagen:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       500:
 *         description: Error al crear usuario
 */
router.post('/', upload.single('imagen'), async (req, res) => {
    const { nombre, email, tel, puesto_id, rol, departamento_id, jefe_directo_id, subordinado_id, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Si no hay imagen, se asigna null; de lo contrario, se convierte a base64.
        const imageBuffer = req.file ? req.file.buffer.toString('base64') : null; 
        
        // Inserta el nuevo usuario en la base de datos
        await sql.query`INSERT INTO usuarios (nombre, email, tel, puesto_id, rol, departamento_id, jefe_directo_id, subordinado_id, imagen, password) 
                        VALUES (${nombre}, ${email}, ${tel}, ${puesto_id}, ${rol}, ${departamento_id}, ${jefe_directo_id}, ${subordinado_id}, ${imageBuffer}, ${hashedPassword})`;
        res.status(201).send('Usuario creado');
    } catch (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).send('Error al crear usuario');
    }
});


/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               tel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar usuario
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, tel} = req.body; 

    try {
        const updateQuery = `
            UPDATE usuarios 
            SET nombre = '${nombre}', email = '${email}', tel = '${tel}'
            WHERE id = ${id}`;

        const result = await sql.query(updateQuery);
        
        if (result.rowsAffected[0] > 0) {
            res.send('Usuario actualizado');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).send('Error al actualizar usuario');
    }
});


module.exports = router;
