var express = require('express')
var moment = require('moment')
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
  var date, json
  if (!isNaN(req.params.id) && moment.unix(req.params.id).isValid) {
    date = moment.unix(req.params.id)
    json = { "unix": date.format("X"), "natural": date.format("MMMM D, YYYY") }
  }
  else if (moment(req.params.id).isValid()) {
    date = moment(req.params.id)
    json = { "unix": date.format("X"), "natural": date.format("MMMM D, YYYY") }
  }
  else {
    json = { "unix": null, "natural": null }
  }
  res.end(JSON.stringify(json)) // Responds with null JSON
});

app.get("*", function(req, res) {
  res.end("404!"); // 404
});

app.listen(port, function () {
  console.log('Timestamp app listening on port ' + port + '!')
})