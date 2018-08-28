const express = require('express')
const bodyParser= require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
var mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
var db
MongoClient.connect('mongodb://pdicuollo:password-123@ds133642.mlab.com:33642/contacts-app-pi', (err, client) => {
    if (err) return console.log(err)
    db = client.db('contacts-app-pi')
    app.listen(3000, function() {
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.get('/contacts', function(req, res) {
            var cursor = db.collection('contacts').find().toArray((err, result) => {
                if (err) return console.log(err)
                res.send(result)
              })
        })

        app.post('/contacts', (req, res) => {
            db.collection('contacts').save(req.body, (err, result) => {
              if (err) return console.log(err)
              res.send("Saved")
            })
        })

        app.post('/deletecontact', (req, res) => {
            var myquery = {_id: new mongodb.ObjectID(req.body.id)};
            db.collection("contacts").deleteOne(myquery, function(err, obj) {
                if (err) throw err;
                res.send("deleted")
            });
        })

        app.post('/updatecontact', (req, res) => {
            var myquery = {_id: new mongodb .ObjectID(req.body.id)};
            var updatedContact = { $set: {first_name: req.body.first_name, last_name: req.body.last_name, phone: req.body.phone, email: req.body.email, notes: req.body.notes } };
            db.collection("contacts").updateOne(myquery, updatedContact, function(err, obj) {
                if (err) throw err;
                res.send("updated")
            });
        })
    })    
})


