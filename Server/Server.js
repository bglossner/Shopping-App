const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const WrapperObj = require('./sql-wrapper')

let wrapper = new WrapperObj({
    host : "localhost",
    user : "appdev",
    password : "password",
    database : "test"
})

let app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.enable('trust proxy')

app.get('/', function (req, res) {
    res.send('Start');
});

app.get('/items/:itemId/:numItems', (req, res) => {
    console.log(req.params)
    console.log("hi");
    let itemId = req.params.itemId
    let numItems = req.params.numItems

    //get data
    wrapper.getItemsFromIDs(itemId, numItems).then((result) => {
        res.send(result);
    });
});


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

app.listen(8000, '127.0.0.1', () => {
    console.log("Connected to port 8000");
});