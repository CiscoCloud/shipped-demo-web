var express = require('express');
var serveStatic = require("serve-static");

var app = express();
app.use(serveStatic(__dirname + "/."));


app.get('/endpoints', function(req, res) {
    var eps = {}
    eps.Account = process.env.HOST_ACCOUNT
    eps.Catalog = process.env.HOST_CATALOGBACKEND
    eps.Cart = process.env.HOST_CARTBACKEND

    // eps.Account= "http://localhost:8887"
    // eps.Catalog		=  "http://localhost:8889"
    // eps.Cart		="http://localhost:8888"

    res.json(eps);
});

//Server listening port.
app.listen(3000);
console.log('Server running on http://0.0.0.0:3000/');
