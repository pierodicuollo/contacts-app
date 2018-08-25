const express = require('express')
const bodyParser= require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('link-to-mongodb', (err, database) => {
    app.listen(3000, function() {
        app.get('/contacts', function(req, res) {
            res.send('All Contacts')
          })
    })    
})


