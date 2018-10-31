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
function getBoughtItems(connection, user_id, limit){
    // shows all the items bought by the user
    if(limit == -1) {
        var myQuery = `SELECT BoughtItems.item_id, Items.item_name FROM BoughtItems 
        INNER JOIN Items ON BoughtItems.item_id = Items.item_id WHERE BoughtItems.user_id = ${user_id}`;
    }
    else {
        var myQuery = `SELECT BoughtItems.item_id, Items.item_name FROM BoughtItems 
        INNER JOIN Items ON BoughtItems.item_id = Items.item_id WHERE BoughtItems.user_id = ${user_id} 
        LIMIT ${limit}`;
    }
    
    
    let boughtItems =  new Promise((resolve, reject) => connection.query(myQuery, (err, result) => {
          if (err){
              reject(err);
          }
          else{
            let boughtItemsArr = [];
            for(let element of result) {
                let boughtItem = {
                    "item_id" : element.item_id,
                    "item_name" : element.item_name
                };
                boughtItemsArr.push(boughtItem);
            }
            resolve(boughtItems);
            console.log(boughtItemsArr);
          }
        }))
        .then(token => {console.log("Done")})
        .catch(error => console.log(error));
    return boughtItems
}

function getLikedItems(connection, user_id, limit){
    // shows all the items likes by the user
    if(limit == -1) {
        var myQuery = `SELECT LikedItems.item_id, Items.item_name FROM LikedItems 
        INNER JOIN Items ON LikedItems.item_id = Items.item_id WHERE LikedItems.user_id = ${user_id}`;
    }
    else {
        var myQuery = `SELECT LikedItems.item_id, Items.item_name FROM LikedItems 
        INNER JOIN Items ON LikedItems.item_id = Items.item_id WHERE LikedItems.user_id = ${user_id} 
        LIMIT ${limit}`;
    }
    
    
    let likedItems =  new Promise((resolve, reject) => connection.query(myQuery, (err, result) => {
          if (err){
              reject(err);
          }
          else{
            let likedItemsArr = [];
            for(let element of result) {
                let likedItem = {
                    "item_id" : element.item_id,
                    "item_name" : element.item_name
                };
                likedItemsArr.push(likedItem);
            }
            resolve(likedItems);
            console.log(likedItemsArr);
          }
        }))
        .then(token => {console.log("Done")})
        .catch(error => console.log(error));
    return likedItems
}


function getAllUserInfo(connection, user_id) {
    let prom = new Promise((resolve, reject) =>
        getUsersFromIDs(connection, user_id, 1).then((user_obj) => {
            if (false) {
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

function getUser(connection, user_id) {
    getAllUserInfo(connection, user_id).then(function(result) {
        console.log("\n");
        console.log(result);
    });
}

getBoughtItems(connection, 518, -1)
getLikedItems(connection, 518, -1)
getUsersIDBased(connection, 514, 6);
getUsersAlphaBased(connection, 514, 6);
getUsersAlphaBased(connection, 514, -1);
getFollowers(connection, 514, -1);
getFollowers(connection, 514, 2);
//getAllUserInfo(connection, 514);

connection.end();