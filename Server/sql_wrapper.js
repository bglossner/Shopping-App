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

async function getBoughtItems(connection, user_id, limit){
    // shows all the items bought by the user
    let boughtItemsArr = [];
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
                boughtItemsArr.push(boughtItem);
            }
            resolve(result);
            // console.log(boughtItemsArr);
          }
        }));
        // .then(token => {})
        // .catch(error => console.log(error));
        return boughtItemsArr;
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
getBoughtItems(connection, 518, -1).then((result) =>{
    console.log(result)
})
getLikedItems(connection, 518, -1)
getUsersIDBased(connection, 514, 6);
getUsersAlphaBased(connection, 514, 6);
getUsersAlphaBased(connection, 514, -1);
getFollowers(connection, 514, -1);

connection.end();