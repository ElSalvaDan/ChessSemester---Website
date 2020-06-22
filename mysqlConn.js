const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATA
});

connection.connect(err => {
    if(err) throw err;
});

module.exports = connection;