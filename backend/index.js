const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json()); // para parsear JSON en el body

const port = 3000;
const pool = new Pool({
    host: 'backend_db',
    user: 'postgres',
    password: 'password',
    database: 'mydb',
    port: 5432,
});

// Ruta de prueba simple
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() AS current_time');
        res.send(`Conectando a PostgreSQL: ${result.rows[0].current_time}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('ERROR AL CONECTAR CON LA BASE DE DATOS');
    }
});

// CRUD Productos

// Crear un producto
app.post('/products', async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creando producto');
    }
});

// Leer todos los productos
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar productos');
  }
});


// Leer un producto por id
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).send('Producto no encontrado');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error obteniendo producto');
    }
});

// Actualizar un producto
app.put('/products/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description, price, stock } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5 RETURNING *',
            [name, description, price, stock, id]
        );
        if (result.rows.length === 0) return res.status(404).send('Producto no encontrado');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error actualizando producto');
    }
});

// Eliminar un producto
app.delete('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).send('Producto no encontrado');
        res.send('Producto eliminado correctamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error eliminando producto');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
