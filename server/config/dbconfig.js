var mysql = require('mysql');

var pool = mysql.createPool({
    host : 'localhost',
    password : '' ,
    user: 'root',
    database : 'bookstore'
});

module.exports = pool;