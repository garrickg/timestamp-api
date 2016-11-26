var express = require('express')
var path = require('path')
var app = express()
var port = process.env.PORT || 3000;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

app.use(express.static(__dirname + '/public'));

app.all("*", function(req, res, next) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get("/:id", function(req, res) {
    if (new Date(req.params.id) == "Invalid Date") { // Checks if valid string date or unix date in milliseconds
        if (new Date(req.params.id*1000) == "Invalid Date") { // Checks if valid unix date in seconds
            var json = { 
                unix: null, 
                natural: null 
            }
            res.end(JSON.stringify(json)) // Returns null result
        }
        else {
            res.end(JSON.stringify(getDateJSON(new Date(req.params.id*1000)))) // Returns results from unix timestamp in seconds
        }
    }
    else {
        res.end(JSON.stringify(getDateJSON(new Date(req.params.id)))) // Returns results from string date or unix time in milliseconds
    }
    
});

app.get("*", function(req, res) {
  res.end("404!"); // 404
});

app.listen(port, function () {
  console.log('Timestamp app listening on port ' + port + '!')
})

function getDateJSON (date) {
    return { 
            "unix": date.getTime() / 1000, // Unix time in seconds
            "natural": months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() // Natural date string
    }
}