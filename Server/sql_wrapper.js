const mysql = require('mysql')

function getUsersFromIDs(connection, start, limit) {
    const myQuery = `SELECT * FROM Users WHERE user_id > ${start - 1} LIMIT ${limit}`;
    let users = new Promise((resolve, reject) => connection.query(myQuery, (err, result, fields) => {
        if (err) {
            reject(err);
        }
        else {
            let users = [];
            for(let element of result) {
                let userRet = {
                    "user_id" : element.user_id,
                    "username" : element.username
                };
                users.push(userRet);
            }
            resolve(users);
        }
    }));
    return users;
}

function getUsersFromAlpha(connection, start, limit) {
    if(limit == -1) {
        var myQuery = `SELECT * FROM Users GROUP BY username`;
    }
    else {
        var myQuery = `SELECT * FROM Users GROUP BY username LIMIT ${limit}`;
    }
    
    let users = new Promise((resolve, reject) => connection.query(myQuery, (err, result, fields) => {
        if (err) {
            reject(err);
        }
        else {
            let users = [];
            for(let element of result) {
                let userRet = {
                    "user_id" : element.user_id,
                    "username" : element.username
                };
                users.push(userRet);
            }
            resolve(users);
        }
    }));
    return users;
}

function getFollowersFromId(connection, id, limit) {
    if(limit == -1) {
        var myQuery = `SELECT Users.user_id, username FROM Users INNER JOIN Followers ON 
                        Followers.follower_id = Users.user_id WHERE Followers.user_id = ${id}`;
    }
    else {
        var myQuery = `SELECT Users.user_id, username FROM Users INNER JOIN Followers ON 
                        Followers.follower_id = Users.user_id WHERE Followers.user_id = ${id} LIMIT ${limit}`;
    }
    
    let users = new Promise((resolve, reject) => connection.query(myQuery, (err, result, fields) => {
        if (err) {
            reject(err);
        }
        else {
            let users = [];
            for(let element of result) {
                let userRet = {
                    "user_id" : element.user_id,
                    "username" : element.username
                };
                users.push(userRet);
            }
            resolve(users);
        }
    }));
    return users;
}

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'appdev',
    password : 'password',
    database : 'test'
});

function getUsersIDBased(connection, start, limit) {
    getUsersFromIDs(connection, start, limit).then(function(result) {
        console.log(result);
    });
}

function getUsersAlphaBased(connection, start, limit) {
    getUsersFromAlpha(connection, start, limit).then(function(result) {
        console.log("\n");
        console.log(result);
    });
}

function getFollowers(connection, id, limit) {
    getFollowersFromId(connection, id, limit).then(function(result) {
        console.log("\n");
        console.log(result);
    });
}
getUsersIDBased(connection, 514, 6);
getUsersAlphaBased(connection, 514, 6);
getUsersAlphaBased(connection, 514, -1);
getFollowers(connection, 514, -1);

connection.end();