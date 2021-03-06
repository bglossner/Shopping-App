const mysql = require('mysql')

module.exports = class DataAccess {

    // Host, user, password, database
    constructor (connectionOptions) {
        this._connection = mysql.createConnection(connectionOptions);
    }

    async getUsersFromIDs(start, limit) {
        let users = [];
        let myQuery = ``;

        if(limit == -1) {
            myQuery = `SELECT * FROM Users WHERE user_id > ${start - 1}`;
        }
        else {
            myQuery = `SELECT * FROM Users WHERE user_id > ${start - 1} LIMIT ${limit}`;
        }
        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result, fields) => {
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

    async getUsersFromAlpha(start, limit) {
        let users = [];
        if(limit == -1) {
            var myQuery = `SELECT * FROM Users GROUP BY username`;
        }
        else {
            var myQuery = `SELECT * FROM Users GROUP BY username LIMIT ${limit}`;
        }
        
        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result, fields) => {
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

    async getFollowersFromId(user_id, limit) {
        let users = [];
        if(limit == -1) {
            var myQuery = `SELECT Users.user_id, username FROM Users INNER JOIN Followers ON 
                            Followers.follower_id = Users.user_id WHERE Followers.user_id = ${user_id}`;
        }
        else {
            var myQuery = `SELECT Users.user_id, username FROM Users INNER JOIN Followers ON 
                            Followers.follower_id = Users.user_id WHERE Followers.user_id = ${user_id} LIMIT ${limit}`;
        }
        
        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result, fields) => {
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

    async getBoughtItems(user_id, limit) {
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
        
        
        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result) => {
            if (err){
                reject(err);
            }
            else {
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

    async getLikedItems(user_id, limit) {
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
        
        
        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result) => {
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
            }));
        
        return likedItems;
    }

    async getAllUserInfo(user_id) {
        let userObject, user, followers, boughtItems, likedItems;
        await new Promise((resolve, reject) => {
            this.getUsersFromIDs(user_id, 1).then((usersRet) => {
                console.log(usersRet);
                user = usersRet;
                console.log("here4")
            });
            this.getFollowersFromId(user_id, -1).then((followersRet) => {
                followers = followersRet;
                console.log("here3")
            });
            this.getBoughtItems(user_id, -1).then((boughtItemsRet) => {
                boughtItems = boughtItemsRet;
                console.log("here2")
            });
            this.getLikedItems(user_id, -1).then((likedItemsRet) => {
                likedItems = likedItemsRet;
                console.log("here")
                userObject = {
                    "user_id" : user["user_id"],
                    "username" : user["username"],
                    "followers" : followers,
                    "bought_items" : boughtItems,
                    "liked_items" : likedItems
                };
                resolve(1);
            });
        });
        
        return userObject;
    }

    async getMostLikedItems(limit) {
        // shows ITEMID, ITEMNAME, NUMBEROFLIKES
        let likedItems = [];
        if(limit != -1) {
            var myQuery = `SELECT Items.item_id, Items.item_name, COUNT(*) as count FROM Items INNER JOIN LikedItems 
            ON LikedItems.item_id=Items.item_id GROUP BY item_id ORDER BY COUNT(*) DESC LIMIT ${limit}`;
        }
        else {
            var myQuery = `SELECT Items.item_id, Items.item_name, COUNT(*) as count FROM Items INNER JOIN LikedItems 
            ON LikedItems.item_id=Items.item_id GROUP BY item_id ORDER BY COUNT(*) DESC`;
        }
        
        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result) => {
            if (err){
                reject(err);
            }
            else{
                for(let element of result) {
                    let likedItem = {
                        "item_id" : element.item_id,
                        "item_name" : element.item_name,
                        "count" : element.count
                    };
                    likedItems.push(likedItem);
                }
                resolve(result);
            }
        }));
        
        return likedItems;
    }

    async getMostBoughtItems(limit) {
        // shows ITEMID, ITEMNAME, NUMBEROFLIKES
        let boughtItems = [];
        if(limit != -1) {
            var myQuery = `SELECT Items.item_id, Items.item_name, COUNT(*) as count FROM Items INNER JOIN BoughtItems 
            ON BoughtItems.item_id=Items.item_id GROUP BY item_id ORDER BY COUNT(*) DESC LIMIT ${limit}`;
        }
        else {
            var myQuery = `SELECT Items.item_id, Items.item_name, COUNT(*) as count FROM Items INNER JOIN BoughtItems 
            ON BoughtItems.item_id=Items.item_id GROUP BY item_id ORDER BY COUNT(*) DESC`;
        }
        
        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result) => {
            if (err){
                reject(err);
            }
            else{
                for(let element of result) {
                    let boughtItem = {
                        "item_id" : element.item_id,
                        "item_name" : element.item_name,
                        "count" : element.count
                    };
                    boughtItems.push(boughtItem);
                }
                resolve(result);
            }
        }));
        
        return boughtItems;
    }

    async getNumberOfLikes(item_id) {
        let numOfLikes = 0
        const myQuery = `SELECT COUNT(*) as count FROM LikedItems WHERE item_id = ${item_id}`;

        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                numOfLikes = result[0].count;
                resolve(result);
            }
        }));
        
        return numOfLikes;
    }

    async getNumberOfBuys(item_id) {
        let numOfBuys = 0;
        const myQuery = `SELECT COUNT(*) as count FROM BoughtItems WHERE item_id = ${item_id}`;

        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                numOfBuys = result[0].count;
                resolve(result);
            }
        }));
        
        return numOfBuys;
    }

    async getItemsFromIDs(start, limit) {
        let items = [];
        let myQuery = ``;
        if(limit == -1) {
            myQuery = `SELECT * FROM Items WHERE item_id >= ${start}`;
        }
        else {
            myQuery = `SELECT * FROM Items WHERE item_id >= ${start} LIMIT ${limit}`;
        }

        await new Promise((resolve, reject) => this._connection.query(myQuery, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                for(let element of result) {
                    let itemRet = {
                        "item_id" : element.item_id,
                        "item_name" : element.item_name
                    };
                    items.push(itemRet);
                }

                resolve(items);
            }
        }));
        
        return items;
    }

    endConnection() {
        this._connection.end();
    }
}