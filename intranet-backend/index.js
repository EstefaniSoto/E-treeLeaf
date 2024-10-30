const app = require('./app');
const { getConnection } = require('./db/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const loginRoutes = require('./routes/login'); 

getConnection();

// Middleware
app.use(cors()); // Permitir solicitudes CORS
app.use(bodyParser.json()); // Parsear el cuerpo de las solicitudes JSON


// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Especificación OpenAPI
        info: {
            title: 'Mi API',
            version: '1.0.0',
            description: 'Documentación de mi API',
        },
        servers: [
            {
                url: 'http://localhost:3000', // URL de mi API
            },
        ],
    },
    apis: ['./routes/*.js'], // Ruta a los archivos que contienen la documentación
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Importar las rutas
const usuariosRoutes = require('./routes/usuarios'); 
const puestosRoutes = require('./routes/puestos'); 
const departamentosRoutes = require('./routes/departamentos'); 

// Integrar rutas
app.use('/api/usuarios', usuariosRoutes); 
app.use('/api/puestos', puestosRoutes); 
app.use('/api/departamentos', departamentosRoutes);
app.use('/api/login', loginRoutes); 

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
