const { Pool } = require('pg');

const pool = new Pool({
  user: 'productsampledb_user',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'SampleProductsDB'
});

module.exports = pool;