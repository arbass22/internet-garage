var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Garage = require('./garage.js');
var GarageHandler = require('./garageHandler.js');

var port = process.env.PORT || 3000;

var garageHandler = new GarageHandler();

app.get('/', function(req, res) {
  res.json({message: "Hello"});
});

app.post('/open/:id', function(req, res) {
  garageHandler.openGarage(req.params.id);
  res.send('ok');
});

app.post('/close/:id', function(req, res) {
  garageHandler.closeGarage(req.params.id);
  res.send('ok');
});

io.on('connection', function(socket){
  var garage = new Garage(socket);
  garageHandler.addGarage(garage);
});

http.listen(port);
console.log("App listening on port " + port);
