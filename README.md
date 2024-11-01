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

Navega a la carpeta del proyecto:
```bash
cd intranet-backend
```
Para instalar todas las dependencias del proyecto, ejecuta el siguiente comando:

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
-- Crear la base de datos eTreeLeaf
CREATE DATABASE eTreeLeaf

GO

-- Usar la base de datos eTreeLeaf
USE eTreeLeaf;
GO

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
    user_password NVARCHAR(255) NOT NULL,
    tel NVARCHAR(15),
    puesto_id INT,
    rol NVARCHAR(20) NOT NULL CHECK (rol IN ('Basico', 'Administrador')),
    departamento_id INT,
    jefe_directo_id INT,
    subordinado_id INT,
    imagen NVARCHAR(MAX),
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
INSERT INTO Usuarios (nombre, email, user_password, tel, puesto_id, rol, departamento_id, jefe_directo_id, subordinado_id)
VALUES 
('Ana Gómez', 'ana.gomez@example.com', '$2a$10$IJdedWL9RsFkHGt5tEutjOQVAmewLdA8aPbDeauk/ty0Uu/k3StG.', '0987654321', 2, 'Administrador', 2, NULL, NULL),
('Debian', 'debian@gmail.com', '$2a$10$XrO17BS3FaKex3nxxMrNv.p33whC8TFwO.jCypZNiKocEynrGpR/6', '1234567890', 1, 'Basico', 1, 1, NULL);

```
## Importante

- Las contraseñas iniciales para los usuarios son las siguientes:
  - **ana.gomez@example.com**: `admin123`
  - **debian@gmail.com**: `123`

- Algunos usuarios iniciarán sin subordinados y sin jefe directo.

- Los usuarios inicialmente aparecerán sin fotos. Sin embargo, los usuarios creados posteriormente podrán ser registrados con imágenes.

## Creación del Usuario Inicial

Si prefieres crear el usuario inicial de 0 de manera manual, puedes usar un archivo que se encuentra en la carpeta `intranet-backend` llamado `hashPassword.js`. 

### Pasos para crear el usuario:

1. Accede al archivo `hashPassword.js`.
2. Cambia la línea que dice `const password = 'tu_contraseña_admin';` por la contraseña que desees.
3. Ejecuta el siguiente comando en tu terminal:

   ```bash
   node hashPassword.js
   ```
4. Copia y pega el resultado generado en el usuario que creaste inicialmente en SQL Server. Esto te permitirá establecer una contraseña encriptada para el usuario inicial en tu base de datos.
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

## Frontend

### Descripción del Frontend

Este proyecto es la interfaz de usuario para la intranet corporativa, donde los administradores pueden gestionar usuarios, departamentos y puestos. La aplicación está desarrollada utilizando React y se conecta a un backend que maneja la lógica de negocio y la base de datos.

### Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework de CSS para estilos personalizados.
- **Axios**: Cliente HTTP para realizar solicitudes a la API.
- **Vite**: Herramienta de desarrollo que permite un arranque rápido y optimización de la construcción.

### Dependencias

Asegúrate de tener las siguientes dependencias en tu archivo `package.json`:

```json
"dependencies": {
  "axios": "^1.7.7",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.27.0"
},
"devDependencies": {
  "@eslint/js": "^9.13.0",
  "@types/react": "^18.3.11",
  "@types/react-dom": "^18.3.1",
  "@vitejs/plugin-react-swc": "^3.5.0",
  "autoprefixer": "^10.4.20",
  "eslint": "^9.13.0",
  "eslint-plugin-react": "^7.37.1",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.13",
  "globals": "^15.11.0",
  "postcss": "^8.4.47",
  "tailwindcss": "^3.4.14",
  "vite": "^5.4.9"
}
```
## Hooks Utilizados

En este proyecto, se utilizaron los siguientes hooks de React:

- **useState**: Para manejar el estado de los componentes, como los datos del formulario y los errores.
- **useEffect**: Para realizar efectos secundarios, como la obtención de datos al cargar el componente.
- **useRef**: Para acceder a elementos DOM directamente, como el manejo de archivos de imagen.
- **useCallback**: Para memorizar funciones que dependen de valores específicos, mejorando el rendimiento en componentes que renderizan frecuentemente.
- **useMemo**: Para memorizar valores derivados que son costosos de calcular y dependen de otros valores en el estado.

## Instrucciones de Instalación

1. Clona el repositorio en tu máquina local:

```bash
git clone https:https://github.com/EstefaniSoto/E-treeLeaf.git
```
2. Navega a la carpeta del proyecto:
```bash
cd intranet-frontend
```
3. Instala las dependencias:
```bash
cd intranet-frontend
```
4. Inicia el servidor de desarrollo:
```bash
npm run dev
```
Abre tu navegador y visita [http://localhost:5173](http://localhost:5173) para ver la aplicación.
