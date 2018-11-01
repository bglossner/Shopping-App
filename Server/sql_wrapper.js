const mysql = require('mysql')

async function getUsersFromIDs(connection, start, limit) {
    let users = [];
    const myQuery = `SELECT * FROM Users WHERE user_id > ${start - 1} LIMIT ${limit}`;
    await new Promise((resolve, reject) => connection.query(myQuery, (err, result, fields) => {
        if (err) {
            reject(err);
        }
        else {
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

async function getUsersFromAlpha(connection, start, limit) {
    let users = [];
    if(limit == -1) {
        var myQuery = `SELECT * FROM Users GROUP BY username`;
    }
    else {
        var myQuery = `SELECT * FROM Users GROUP BY username LIMIT ${limit}`;
    }
    
    await new Promise((resolve, reject) => connection.query(myQuery, (err, result, fields) => {
        if (err) {
            reject(err);
        }
        else {
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

async function getFollowersFromId(connection, user_id, limit) {
    let users = [];
    if(limit == -1) {
        var myQuery = `SELECT Users.user_id, username FROM Users INNER JOIN Followers ON 
                        Followers.follower_id = Users.user_id WHERE Followers.user_id = ${user_id}`;
    }
    else {
        var myQuery = `SELECT Users.user_id, username FROM Users INNER JOIN Followers ON 
                        Followers.follower_id = Users.user_id WHERE Followers.user_id = ${user_id} LIMIT ${limit}`;
    }
    
    await new Promise((resolve, reject) => connection.query(myQuery, (err, result, fields) => {
        if (err) {
            reject(err);
        }
        else {
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

async function getBoughtItems(connection, user_id, limit){
    // shows all the items bought by the user
    let boughtItems = [];
    if(limit == -1) {
        var myQuery = `SELECT BoughtItems.item_id, Items.item_name FROM BoughtItems 
        INNER JOIN Items ON BoughtItems.item_id = Items.item_id WHERE BoughtItems.user_id = ${user_id}`;
    }
    else {
        var myQuery = `SELECT BoughtItems.item_id, Items.item_name FROM BoughtItems 
        INNER JOIN Items ON BoughtItems.item_id = Items.item_id WHERE BoughtItems.user_id = ${user_id} 
        LIMIT ${limit}`;
    }
    
    
    await new Promise((resolve, reject) => connection.query(myQuery, (err, result) => {
          if (err){
              reject(err);
          }
          else{
            
            for(let element of result) {
                let boughtItem = {
                    "item_id" : element.item_id,
                    "item_name" : element.item_name
                };
                boughtItems.push(boughtItem);
            }
            resolve(result);
          }
        }));
        return boughtItems;
}

async function getLikedItems(connection, user_id, limit){
    // shows all the items likes by the user
    let likedItems = [];
    if(limit == -1) {
        var myQuery = `SELECT LikedItems.item_id, Items.item_name FROM LikedItems 
        INNER JOIN Items ON LikedItems.item_id = Items.item_id WHERE LikedItems.user_id = ${user_id}`;
    }
    else {
        var myQuery = `SELECT LikedItems.item_id, Items.item_name FROM LikedItems 
        INNER JOIN Items ON LikedItems.item_id = Items.item_id WHERE LikedItems.user_id = ${user_id} 
        LIMIT ${limit}`;
    }
    
    
    await new Promise((resolve, reject) => connection.query(myQuery, (err, result) => {
          if (err){
              reject(err);
          }
          else{
            for(let element of result) {
                let likedItem = {
                    "item_id" : element.item_id,
                    "item_name" : element.item_name
                };
                likedItems.push(likedItem);
            }
            resolve(result);
          }
        }))
    return likedItems
}


async function getAllUserInfo(connection, user_id) {
    let userObject;
    await new Promise((resolve, reject) =>
        getUsersFromIDs(connection, user_id, 1).then((users) => {
            let user = users[0];
            getFollowersFromId(connection, user_id, -1).then((followers) => {
                getBoughtItems(connection, user_id, -1).then((boughtItems) => {
                    getLikedItems(connection, user_id, -1).then((likedItems) => {
                        resolve(users);
                        userObject = {
                            "user_id" : user["user_id"],
                            "username" : user["username"],
                            "followers" : followers,
                            "bought_items" : boughtItems,
                            "liked_items" : likedItems
                        }
                    });
                });
            });
        }
    ));

    return userObject;
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

function getUser(connection, user_id) {
    getAllUserInfo(connection, user_id).then(function(result) {
        console.log("\n");
        console.log(result);
    });
}


// TESTING STUFF BELOW
getBoughtItems(connection, 518, -1).then((result) => {
    console.log("This is the BOUGHT ITEMS array")
    console.log(result);
});
getLikedItems(connection, 518, -1).then((result) => {
    console.log("This is the LIKED ITEMS array")
    console.log(result);
});
getUsersFromIDs(connection, 514, 6).then((result) => {
    console.log("This is the USERS FROM IDs array")
    console.log(result);
});
getUsersFromAlpha(connection, 514, 6).then((result) => {
    console.log("This is the USERS FROM ALPHA array")
    console.log(result);
});
// getUsersAlphaBased(connection, 514, -1);
getFollowersFromId(connection, 514, -1).then((result) => {
    console.log("This is the FOLLOWERS FROM IDs array")
    console.log(result);
});
// getFollowers(connection, 514, 2);
getAllUserInfo(connection, 514).then((result) => {
    console.log("This is the ALL USER INFO array")
    console.log(result);
    connection.end();
});

