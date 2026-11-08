const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test de la connexion
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erreur de connexion à la base de données :', err.stack);
  }
  console.log('Connexion à la base de données ocp_app réussie !');
  release();
});

module.exports = pool;