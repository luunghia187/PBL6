var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'pbl6'
// });

var connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'FpOP5swXpw',
    password: 'vaYhu1dWAL',
    database: 'FpOP5swXpw'
});

connection.connect(function (err, connection) {
    if(err) console.log("ket noi that bai");
    else console.log("ket noi");
});

module.exports = connection;