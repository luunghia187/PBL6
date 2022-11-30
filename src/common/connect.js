var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'pbl6'
// });

var connection = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: 'remotemysql.com',
    user: 'FpOP5swXpw',
    password: 'vaYhu1dWAL',
    database: 'FpOP5swXpw'
});

connection.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = connection;