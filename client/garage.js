var socketio = require('socket.io-client');

module.exports = Garage;

function Garage(garage_id, trigger_pin, sensor_pin) {
  this.garage_id = garage_id
  // Used to open/close garage door relay
  this.triggerPin  = trigger_pin;
  // Used to detect if door is open or closed
  this.sensorPin = sensor_pin;

  var socket = socketio('http://localhost:3000', {query: 'garage_id=' + this.garage_id});

  socket.on('connect', function() {
    this.socket = socket;
  });

  var open = this.open;
  socket.on('open', function() {
    open();
  });

  var close = this.close;
  socket.on('close', function() {
    close();
  });

  socket.on('disconnect', function() {
    console.log("socket disconnected");
    this.socket = null;
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
