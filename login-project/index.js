const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection FAILED:', err.message);
  } else {
    console.log('Database connected successfully!');
    release();
  }
});

app.get('/', (req, res) => {
  res.send('Server and database are running!');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});