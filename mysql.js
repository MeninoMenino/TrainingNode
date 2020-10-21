const mysql = require('mysql2');

var pool = mysql.createPool({
    "connectionLimit" : 100,
    "user": "root",
    "password": "1234",
    "database": "ecommerce",
    "host": "localhost",
    "port": "3306"
});

//Promise de consulta
exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(
            query,
            params,
            (error, result, fields) => {
                //Caso dê erro
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    });
}

exports.pool = pool;