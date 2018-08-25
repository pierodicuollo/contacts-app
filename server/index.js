const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function() {
    app.get('/', function(req, res) {
        res.send('Hello World')
      })
})
