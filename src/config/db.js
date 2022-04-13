const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASS,
    database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
    if (err) throw err
    console.log("Connected to database " + process.env.MYSQL_DATABASE)
})

module.exports = connection;