const mysql = require('mysql2');

var pool = mysql.createPool({
    "user": "root",
    "password": "1234",
    "database": "ecommerce",
    "host": "localhost",
    "port": "3306"
});

exports.pool = pool;