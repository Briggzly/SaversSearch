const Pool = require('pg').Pool;
require('dotenv').config()

const {HOST, USER, PASSWORD, DPORT, DATABASE} = process.env

const pool = new Pool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    port: DPORT,
    database: DATABASE
});

module.exports = pool;