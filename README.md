# Proyecto Intranet Corporativa

## Descripción

Este proyecto consiste en una intranet corporativa que permite gestionar usuarios, departamentos y puestos dentro de una organización. Está compuesto por un **backend** construido con **Node.js** y **Express**, que se comunica con una base de datos **SQL Server**, y un **frontend** desarrollado en **React**. Este sistema permite a los administradores gestionar usuarios y sus roles, así como la estructura organizativa.

---

## Backend

### Descripción del Backend

El backend de la intranet corporativa permite gestionar usuarios, departamentos y puestos. Utiliza una API RESTful construida con Node.js y Express, que se comunica con una base de datos SQL Server para almacenar y recuperar información.

### Dependencias

El proyecto utiliza las siguientes dependencias:

```json
"dependencies": {
  "bcryptjs": "^2.4.3",                // Librería de hashing de contraseñas para entornos sin soporte nativo de bcrypt.
  "body-parser": "^1.20.3",            // Middleware para parsear el cuerpo de las solicitudes.
  "cors": "^2.8.5",                    // Middleware para habilitar CORS (Cross-Origin Resource Sharing).
  "dotenv": "^16.4.5",                 // Carga variables de entorno desde un archivo `.env`.
  "express": "^4.21.1",                // Framework web para Node.js.
  "mssql": "^11.0.1",                  // Cliente para conectarse a bases de datos SQL Server.
  "multer": "^1.4.5-lts.1",            // Middleware para manejar la carga de archivos.
  "swagger-jsdoc": "^6.2.8",           // Generador de documentación Swagger a partir de anotaciones en el código.
  "swagger-ui-express": "^5.0.1"       // Middleware para servir la interfaz de usuario de Swagger.
}
```
## Instalación

Para instalar todas las dependencias del proyecto, ejecuta el siguiente comando en el directorio raíz del proyecto:

```bash
npm install
```
## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias para la conexión a la base de datos y otras configuraciones. Un ejemplo de las variables que debes incluir podría ser:

```env
DB_SERVER=TU_SERVIDOR_SQL
DB_DATABASE=TU_BASE_DE_DATOS
DB_USER=TU_USUARIO
DB_PASSWORD=TU_CONTRASEÑA
JWT_SECRET=TU_SECRETO
```
## Base de Datos

Asegúrate de tener la base de datos definida en SQL Server, junto con las tablas necesarias (Usuarios, Departamentos, Puestos). Utiliza el script SQL proporcionado para crear las tablas y agregar datos iniciales.

```sql
-- Crear tabla Departamentos
CREATE TABLE Departamentos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL
);

-- Crear tabla Puestos
CREATE TABLE Puestos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL
);

-- Crear tabla Usuarios
CREATE TABLE Usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    tel NVARCHAR(15),
    puesto_id INT,
    rol NVARCHAR(20) NOT NULL CHECK (rol IN ('básico', 'administrativo')),
    departamento_id INT,
    jefe_directo_id INT,
    subordinado_id INT,
    imagen NVARCHAR(255),
    FOREIGN KEY (puesto_id) REFERENCES Puestos(id),
    FOREIGN KEY (departamento_id) REFERENCES Departamentos(id),
    FOREIGN KEY (jefe_directo_id) REFERENCES Usuarios(id),
    FOREIGN KEY (subordinado_id) REFERENCES Usuarios(id)
);

-- Inserción de datos iniciales en Departamentos
INSERT INTO Departamentos (nombre) VALUES
('Recursos Humanos'),
('Tecnología'),
('Ventas');

-- Inserción de datos iniciales en Puestos
INSERT INTO Puestos (nombre) VALUES
('Desarrollador'),
('Gerente'),
('Vendedor');

-- Inserción de datos iniciales en Usuarios
INSERT INTO Usuarios (nombre, email, tel, puesto_id, rol, departamento_id)
VALUES 
('Juan Pérez', 'juan.perez@example.com', '1234567890', 1, 'básico', 2),
('Ana Gómez', 'ana.gomez@example.com', '0987654321', 2, 'administrativo', 1),
('Carlos López', 'carlos.lopez@example.com', '1122334455', 3, 'básico', 3);

```
## Ejecución

Para ejecutar el backend, utiliza el siguiente comando:

```bash
npm start
```
## Ejecución

Esto iniciará el servidor en el puerto configurado (por defecto, el puerto 3000). Puedes acceder a la API a través de [http://localhost:3000/api](http://localhost:3000/api).

### Documentación de la API

La documentación de la API se genera automáticamente utilizando Swagger. Puedes acceder a ella en el siguiente enlace después de iniciar el servidor:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Esta documentación proporciona detalles sobre los endpoints disponibles, sus métodos y las estructuras de datos esperadas.
