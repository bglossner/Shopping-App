const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

let app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.enable('trust proxy')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'appdev',
    password : 'password',
    database : 'test'
  });

connection.connect((err) => {
    if (err) {
        console.log('error:' + err.stack)
        return
    }

    console.log('db connected')
})
app.get('/items', (req, res) => {
    let userId = req.params.userId
    let numItems = req.params.numItems

    //get data

    let items = []

    res.send(items)
})


app.get('/followers', (req, res) => {
    let userId = req.headers.userId
    let numFollowers = req.params.numFollowers
    let friendIds = []
    connection.query('SELECT friend_id from Friends WHERE user_id=' + userId, (err, result, fields) => {
        if (err) {
            console.log(err)
        }
        result.forEach((item) => {
            friendIds.push(item.friend_id)
    })
    console.log(friendIds)

})})



app.get('/users', (req, res) => {
    userId = req.headers.userId
    numUsers = req.params.numUsers


})



// function test() {
//     let friendIs = []
//     connection.query('SELECT follower_id from Followers WHERE user_id=' + 518, (err, result, fields) => {
//         if (err) {
//             console.log(err)
//         }
//         result.forEach((item) => {
//             friendIs.push(item.follower_id)
//         })
//         console.log(friendIs)
//     })
// }

function test(){
    // shows all the items bought by the user
    userID = 518
    let items = []
    const myQuery = "SELECT item_id from BoughtItems WHERE user_id =" + 518;
    let results =  new Promise((resolve, reject) => connection.query(myQuery, (err, result) => {
          if (err){
              reject(err);
          }
          result.forEach((item)=>{
            let id = item.item_id
            connection.query("SELECT item_name FROM Items WHERE item_id =" + id, (err, result, fields) => {
                if (err){
                    reject(err);
                }
                else{
                    result.forEach((item)=>{
                    newItem = {"item_id" : id, 
                                "item_name": item.item_name}
                    items.push(newItem)
                    })
            }
        });
          });
        resolve(result)
        }))
        .then(token => {console.log("Done")})
        .catch(error => console.log(error));
    return items
}

// const items = test();
// setTimeout(
//     () => {
//         console.log("Hello")
//         console.log(items)
//     }, 100
// );



function getBoughtItems(){
    // shows all the items bought by the user
    userID = 518
    let items = []
    const myQuery = "Select BoughtItems.item_id, Items.item_name from BoughtItems inner join Items on BoughtItems.item_id = Items.item_id WHERE BoughtItems.user_id = 518";
    let results =  new Promise((resolve, reject) => connection.query(myQuery, (err, result) => {
          if (err){
              reject(err);
          }
          else{
              console.log(result)
          }
        resolve(result)
        }))
        .then(token => {console.log("Done")})
        .catch(error => console.log(error));
    return items
}
const items = getBoughtItems();

