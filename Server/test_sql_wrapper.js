const WrapperObj = require('./sql-wrapper')

let wrapper = new WrapperObj({
    host : "localhost",
    user : "appdev",
    password : "password",
    database : "test"
});

//const mysql = require('mysql')

/*var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'appdev',
    password : 'password',
    database : 'test'
});*/

// TESTING STUFF BELOW
wrapper.getBoughtItems(518, -1).then((result) => {
    console.log("This is the BOUGHT ITEMS array")
    console.log(result);
});
wrapper.getLikedItems(518, -1).then((result) => {
    console.log("This is the LIKED ITEMS array")
    console.log(result);
});
wrapper.getUsersFromIDs(514, 6).then((result) => {
    console.log("This is the USERS FROM IDs array")
    console.log(result);
});
wrapper.getUsersFromAlpha(514, 6).then((result) => {
    console.log("This is the USERS FROM ALPHA array")
    console.log(result);
});
// getUsersAlphaBased(514, -1);
wrapper.getFollowersFromId(514, -1).then((result) => {
    console.log("This is the FOLLOWERS FROM IDs array")
    console.log(result);
});
wrapper.getNumberOfLikes(1).then((result) => {
    console.log("This is the NUMBER OF LIKES OF an ITEM");
    console.log(result);
});
wrapper.getNumberOfBuys(2).then((result) => {
    console.log("This is the NUMBER OF BUYS OF an ITEM");
    console.log(result);
});
wrapper.getMostLikedItems(-1).then((result) => {
    console.log("This is the MOST LIKED ITEMS array")
    console.log(result);
});
wrapper.getMostBoughtItems(-1).then((result) => {
    console.log("This is the MOST BOUGHT ITEMS array")
    console.log(result);
    //console.log("reached");
});
// getFollowers(514, 2);
wrapper.getItemsFromIDs(2, 4).then((result) => {
    console.log("This shows the ITEMS");
    console.log(result);
});
console.log(wrapper.getAllUserInfo(514));
/*wrapper.getAllUserInfo(514).then((result) => {
    console.log("This is the ALL USER INFO array")
    console.log(result);
});*/