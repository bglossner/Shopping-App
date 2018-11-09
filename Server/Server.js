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
    let itemId = req.params.itemId;
    let numItems = req.params.numItems;

    //get data
    wrapper.getItemsFromIDs(itemId, numItems).then((result) => {
        res.send(result);
    });
});


app.get('/followers/:userId/:numFollowers', (req, res) => {
    let userId = req.params.userId
    let numFollowers = req.params.numFollowers

    //get followers
    wrapper.getFollowersFromId(userId, numFollowers).then((result) => {
        res.send(result);
    });
});

app.get('/users/:method/:userId/:numUsers', (req, res) => {
    let method = req.params.method;
    let userId = req.params.userId;
    let numUsers = req.params.numUsers;
    if(!method) {
        wrapper.getUsersFromIDs(userId, numUsers).then((result) => {
            res.send(result);
        });
    }
    else {
        wrapper.getUsersFromAlpha(numUsers).then((result) => {
            res.send(result);
        });
    }
});

app.get('/items/likes/:itemId', (req, res) => {
    let method = req.params.methpd;
    let userId = req.params.userId;
    let numUsers = req.params.numUsers;
    if(!method) {
        wrapper.getUsersFromIDs(userId, numUsers).then((result) => {
            res.send(result);
        });
    }
    else {
        wrapper.getUsersFromAlpha(numUsers).then((result) => {
            res.send(result);
        });
    }
});

app.listen(8000, '127.0.0.1', () => {
    console.log("Connected to port 8000");
});