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
