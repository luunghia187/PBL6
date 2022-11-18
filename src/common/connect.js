var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'pbl6'
// });

var connection = mysql.createPool({
    host: 'remotemysql.com',
    user: 'FpOP5swXpw',
    password: 'vaYhu1dWAL',
    database: 'FpOP5swXpw'
});

connection.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = connection;