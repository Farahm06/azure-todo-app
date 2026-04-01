const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config({ override: false });

const app = express();
app.use(cors());
app.use(express.json());

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'définie' : 'UNDEFINED');

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER || 'todoadmin',
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE || 'postgres',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN DEFAULT false
  )
`).catch(err => console.error('DB init error:', err));

// Routes
app.get('/api/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id');
  res.json(result.rows);
});

app.post('/api/todos', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );
  res.json(result.rows[0]);
});

app.patch('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const result = await pool.query(
    'UPDATE todos SET done=$1 WHERE id=$2 RETURNING *',
    [done, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/todos/:id', async (req, res) => {
  await pool.query('DELETE FROM todos WHERE id=$1', [req.params.id]);
  res.json({ message: 'Supprimé' });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend lancé sur le port ${PORT}`));
