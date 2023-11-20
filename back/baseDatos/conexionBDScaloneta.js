const mysql = require('mysql2/promise');

// pool de conexiones a la base de datos
const conexion = mysql.createPool({
    host: 'localhost',
    user: 'scaloneta12',
    database: 'scaloneta12',
    password: '2023$prog3'
});


module.exports = conexion

