var socketio = require('socket.io-client');

module.exports = Garage;

function Garage(garageId, triggerPin, sensorPin) {
  this.garageId = garageId
  this.triggerPin  = triggerPin;
  this.sensorPin = sensorPin;

  // Create a socket to cloud server
  var socket = socketio('http://localhost:3000', {query: 'garageId=' + this.garageId});

  var self = this;

  socket.on('connect', function() {
    self.socket = socket;
  });

  socket.on('open', function() {
    self.open();
  });

  socket.on('close', function() {
    self.close();
  });

  socket.on('disconnect', function() {
    console.log("socket disconnected");
    self.socket = null;
  });
}

Garage.prototype.open = function() {
  console.log("Opening garage door...");
}

Garage.prototype.close = function() {
  console.log("Closing garage door...");
}

Garage.prototype.isClosed = function() {
  return false;
}

Garage.prototype.signalOpened = function() {
  this.socket.emit('opened');
}

Garage.prototype.signalClosed = function() {
  this.socket.emit('closed');
}
