var helper = require('sendgrid').mail
const async = require('async')
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
var mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
var db

function sendEmail(
    parentCallback,
    fromEmail,
    toEmails,
    subject,
    textContent,
    htmlContent
  ) {
    const errorEmails = [];
    const successfulEmails = [];
     const sg = require('sendgrid')   ('__YOUR_APIKEY_CREATED_ON_SENDGRID__');
     async.parallel([
      function(callback) {
        // Add to emails
        for (let i = 0; i < toEmails.length; i += 1) {
          // Add from emails
          const senderEmail = new helper.Email(fromEmail);
          // Add to email
          const toEmail = new helper.Email(toEmails[i]);
          // HTML Content
          const content = new helper.Content('text/html', htmlContent);
          const mail = new helper.Mail(senderEmail, subject, toEmail, content);
          var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          });
          sg.API(request, function (error, response) {
            console.log('SendGrid');
            if (error) {
              console.log('Error response received');
            }
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          });
        }
        // return
        callback(null, true);
      }
    ], function(err, results) {
      console.log('Done');
    });
    parentCallback(null,
      {
        successfulEmails: successfulEmails,
        errorEmails: errorEmails,
      }
    );
}

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

        app.post('/email', (req, res) => {
            async.parallel([
                function (callback) {
                  sendEmail(
                    callback,
                    'YOUR_FROM_EMAIL@example.com',
                    [req.body.email],
                    req.body.subject,
                    req.body.body
                  );
                }
              ], function(err, results) {
                res.send({
                  success: true,
                  message: 'Email sent',
                  successfulEmails: results[0].successfulEmails,
                  errorEmails: results[0].errorEmails,
                });
              });
        })
    })    
})


