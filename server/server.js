var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Garage = require('./garage.js');

var port = process.env.PORT || 3000;

var garages = [];

app.get('/', function(req, res) {
  res.json({message: "Hello"});
})

io.on('connection', function(socket){
  var garage = new Garage(socket);
  garage.open();
});


http.listen(port);
console.log("App listening on port " + port);
