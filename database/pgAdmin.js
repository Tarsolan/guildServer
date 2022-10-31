const { Pool } = require("pg");

let pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = pool;
