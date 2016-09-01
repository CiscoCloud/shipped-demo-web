var express = require('express');
var serveStatic = require("serve-static");

var app = express();
app.use(serveStatic(__dirname + "/."));


app.get('/endpoints', function(req, res) {
    var eps = {}
    eps.Account = process.env.HOST_SHIPPED_DEMO_ACCOUNT
    eps.Catalog = process.env.HOST_SHIPPED_DEMO_CATALOG
    eps.Cart = process.env.HOST_SHIPPED_DEMO_CART

    // eps.Account= "http://localhost:38894"
    // eps.Catalog		=  "http://localhost:38892"
    // eps.Cart		="http://localhost:8888"
    //
    //
    // var DEPLOY_TARGET = process.env.DEPLOY_TARGET;
    //
    //
    // if(eps.Catalog != undefined)
    // {
    //   eps.Catalog = eps.Catalog.substring(eps.Catalog.indexOf("//")+2);
    //   console.log("Service "+eps.Catalog);
    // }
    //
    // var app = express()
    // app.use(serveStatic(__dirname + "/."))
    // var apiport=80
    // if (DEPLOY_TARGET != undefined && DEPLOY_TARGET == "LOCAL_SANDBOX")
    // {
    //     apiport=8888
    //     eps.Catalog = "vote_api";
    // }

    res.json(eps);
});

//Server listening port.
app.listen(3000);
console.log('Server running on http://0.0.0.0:3000/');
