
var express = require('express');
var serveStatic = require("serve-static");

var app = express();
app.use(serveStatic(__dirname + "/."));


app.get('/endpoints', function (req, res) {
	var eps={}

	eps.Account 	= process.env.ACCOUNT_HOST
	eps.Catalog		= process.env.CATALOG_HOST
	eps.Cart		= process.env.CART_HOST

	// eps.Account= "http://staging--shop--account--a6cc3a.shipped-cisco.com"
	// eps.Catalog		=  "http://staging--shop--catalog--dba7f3.shipped-cisco.com"
  // eps.Cart		="http://staging--shop--cart--26a94c.shipped-cisco.com"

	// eps.Account= "http://localhost:8887"
	// eps.Catalog		=  "http://localhost:8889"
  // eps.Cart		="http://localhost:8888"

	res.json(eps);
});

//Server listening port.
app.listen(3000);
console.log('Server running on http://0.0.0.0:3000/');
