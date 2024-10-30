const sql = require('mssql');
require('dotenv').config({path: '.env'})

const config = {
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        validateBulkLoadParameters: false,
        encrypt: false,
    }
};

const getConnection = async () => {
    try {
        await sql.connect(config);
        console.log("DB conectada!");
    } catch (error) {
        console.log(`Error encontrado en la BD: ${error}`);
    }
};

module.exports = { getConnection, sql }; 
