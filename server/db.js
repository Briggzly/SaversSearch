const Pool = require('pg').Pool;
require('dotenv').config()

const {HOST, USER, PASSWORD, PORT, DATABASE} = process.env

const pool = new Pool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    port: PORT,
    database: DATABASE
});

module.exports = pool;