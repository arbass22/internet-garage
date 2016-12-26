var socketio = require('socket.io-client');

module.exports = Garage;

function Garage(garage_id, trigger_pin, sensor_pin) {
  this.garage_id = garage_id
  // Used to open/close garage door relay
  this.triggerPin  = trigger_pin;
  // Used to detect if door is open or closed
  this.sensorPin = sensor_pin;

  var io = socketio('http://localhost:3000', {query: 'garage_id=' + this.garage_id});
  io.on('connection', function(socket) {
    this.socket = socket;
    socket.on('open', function() {
      this.open();
    });
    socket.on('close', function() {
      this.close();
    });
    socket.on('disconnect', function() {
      this.socket = null;
    })
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
