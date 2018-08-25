const express = require('express');
const app = express();

app.listen(3000, function() {
    app.get('/', function(req, res) {
        res.send('Hello World')
      })
})
