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

function getFollowersFromId(connection, user_id, limit) {
    if(limit == -1) {
        var myQuery = `SELECT Users.user_id, username FROM Users INNER JOIN Followers ON 
                        Followers.follower_id = Users.user_id WHERE Followers.user_id = ${user_id}`;
    }
    else {
        var myQuery = `SELECT Users.user_id, username FROM Users INNER JOIN Followers ON 
                        Followers.follower_id = Users.user_id WHERE Followers.user_id = ${user_id} LIMIT ${limit}`;
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

function getAllUserInfo(connection, user_id) {
    let prom = new Promise((resolve, reject) =>
        getUsersFromIDs(connection, user_id, 1).then((user_obj) => {
            if (err) {
                reject(err);
            }
            else {
                let userObj = user_obj[0];
                getFollowersFromId(connection, user_id, -1).then((followers) => {
                    getBoughtItems(connection, user_id, -1).then((bitems) => {
                        getLikedItems(connection, user_id, -1).then((litems) => {
                            resolve({
                                "user_id" : userObj["user_id"],
                                "username" : userObj["username"],
                                "followers" : followers,
                                "bought_items" : bitems,
                                "liked_items" : litems
                            });
                        });
                    });
                });
            }
        })
    );

    return prom;
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

function getFollowers(connection, user_id, limit) {
    getFollowersFromId(connection, user_id, limit).then(function(result) {
        console.log("\n");
        console.log(result);
    });
}

getUsersAlphaBased(connection, user_id) {
    getAllUserInfo(connection, user_id).then(function(result) {
        console.log("\n");
        console.log(result);
    });
}

getUsersIDBased(connection, 514, 6);
getUsersAlphaBased(connection, 514, 6);
getUsersAlphaBased(connection, 514, -1);
getFollowers(connection, 514, -1);
getFollowers(connection, 514, 2);
getAllUserInfo(connection, 514);

connection.end();