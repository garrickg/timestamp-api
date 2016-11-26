var express = require('express')
var moment = require('moment')
var logger = require("morgan");
var app = express()
var port = process.env.PORT || 3000;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

app.use(logger());
app.use(express.static(__dirname + '/public'));

app.all("*", function(req, res, next) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get("/:id", function(req, res) {
    if (!moment(req.params.id).isValid()) { // Checks if arg is valid date
        var json = { 
            unix: null, 
            natural: null 
        }
        res.end(JSON.stringify(json)) // Responds with null JSON
    }
    else {
        res.end(JSON.stringify({ 
            "unix": moment(req.params.id).format("X"), // Unix time in seconds
            "natural": moment(req.params.id).format("MMMM D, YYYY") // Natural date string
        })) // Responds with date JSON
    }
});

app.get("*", function(req, res) {
  res.end("404!"); // 404
});

app.listen(port, function () {
  console.log('Timestamp app listening on port ' + port + '!')
})