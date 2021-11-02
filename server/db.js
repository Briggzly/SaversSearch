const Pool = require('pg').Pool;

const pool = new Pool({
    host: "localhost",
    user: "kysonbriggs",
    password: "bubbles",
    port: 5432,
    database: 'saverssearch'
});

module.exports = pool;