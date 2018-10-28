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
console.log('working')
test()

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

function test() {
    connection.query('SELECT friend_id from Friends WHERE user_id=' + userId, (err, result, fields) => {
        if (err) {
            console.log(err)
        }
        result.forEach((item) => {
            friendIds.push(item.friend_id)
    })
})
    console.log(friendIds)
}

function test() {
    let friendIs = []
    connection.query('SELECT friend_id from Friends WHERE user_id=' + 518, (err, result, fields) => {
        if (err) {
            console.log(err)
        }
        result.forEach((item) => {
            friendIs.push(item)
        })
        console.log(friendIs)
    })
}


