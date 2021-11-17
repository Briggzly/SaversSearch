const Pool = require("pg").Pool;
require("dotenv").config({ path: './server/.env' });

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

const pool = new Pool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  ssl: process.env.NODE_ENV === "production" ? {rejectUnauthorized: false} : false
});

module.exports = pool;
