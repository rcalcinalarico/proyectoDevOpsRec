# proyectoFinalDevOps

proyecto recuperatorio Angel Benavidez Roca

# Store Technology - Proyecto DevOps

Este proyecto es una tienda de productos tecnológicos con Node.js, BD PostgreSQL y un frontend HTML/Bootstrap servido con Nginx.

## Estructura del Proyecto

```
|-- docker-compose.yml
|
|-- backend
|   |-- index.js
|   |-- package.json
|   |-- package-lock.json
|
|-- db
|   |-- init
|       |-- init.sql
|
|-- frontend
    |-- index.html
    |-- app.js
    |-- styles.css
    |-- Dockerfile
```

---

## Como correr la imagen docker

1. **Levantar los servicios con Docker Compose:**

   ```cortar los servicios que esten activos y usar el comando en la terminal:
   docker-compose down
   ```

   ```usar el comando en la terminal:
   docker-compose up --build
   ```

2. **Acceder a pgAdmin (opcional):**

   - URL: [http://localhost:8081](http://localhost:8081)
   - Email: `admin@admin.com`
   - Contraseña: `admin`

   Para conectarte al servidor PostgreSQL desde pgAdmin:

   - Host: `backend_db`
   - Puerto: `5432`
   - Usuario: `postgres`
   - Contraseña: `password`
   - Base de datos: `mydb`

---

## 📋 Endpoints del Backend

- `GET /products` - Listar productos
- `GET /products/:id` - Obtener un producto por ID
- `POST /products` - Crear producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

## 📋 Probando endpoints desde thunder client

- `GET http://localhost:3000/` - probando conexion, retorna fecha y hora

- `GET http://localhost:3000/products` - Listar productos

- `POST http://localhost:3000/products` - registrar producto

  - Haz clic en la pestaña Body.
  - Selecciona el tipo JSON.
    Enviar datos como JSON. (pegar este json ahi)
  - click en send o enviar

  {
  "name": "Cuaderno universitario",
  "description": "Cuaderno de 100 hojas",
  "price": 15.50,
  "stock": 30
  }

- Para ambos casos eliminar actualizar cambiar 1, por el ID del producto deseado

- `DELETE http://localhost:3000/products/1` - eliminar por el ID del producto
- `PUT http://localhost:3000/products/1` - actualizar por el ID del producto
  - Haz clic en la pestaña Body.
  - Selecciona el tipo JSON.
    Enviar datos como JSON. (pegar este json ahi)
  - click en send o enviar
    {
    "name": "Cuaderno espiral",
    "description": "Cuaderno de 200 hojas",
    "price": 25.99,
    "stock": 40
    }
