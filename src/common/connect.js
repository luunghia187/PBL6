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
    host: 'sql6.freesqldatabase.com',
    user: 'sql6586699',
    password: 'es77Z71CzM',
    database: 'sql6586699'
});

connection.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = connection;