const mysql = require('mysql');

function getUsersFromIDs(connection, start, limit, callback) {
    const myQuery = `SELECT * FROM Users WHERE user_id > ${start - 1} LIMIT ${limit}`;
    connection.query()
    

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'appdev',
    password : 'password',
    database : 'test'
});

console.log(getUsersFromIDs(connection, 514, 6));
connection.end();