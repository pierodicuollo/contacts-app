const express = require('express')
const bodyParser= require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient
var db
MongoClient.connect('mongodb://pdicuollo:password-123@ds133642.mlab.com:33642/contacts-app-pi', (err, client) => {
    if (err) return console.log(err)
    db = client.db('contacts-app-pi')
    app.listen(3000, function() {
        app.get('/contacts', function(req, res) {
            var cursor = db.collection('contacts').find().toArray((err, result) => {
                if (err) return console.log(err)
                res.send(result)
              })
        })

        app.post('/contacts', (req, res) => {
            db.collection('contacts').save(req.body, (err, result) => {
              if (err) return console.log(err)
          
              console.log('saved to database')
              res.send("Saved")
            })
        })
    })    
})


