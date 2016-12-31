module.exports = Garage;

var status = {
  OPEN: 'open',
  CLOSED: 'closed',
  UNKNOWN: 'unknown'
};

function Garage(socket) {
  this.socket = socket;
  this.garage_id = socket.handshake.query.garage_id;
  this.status = status.UNKNOWN;
  console.log('Established connection with garage #' + this.garage_id);
  socket.on('disconnect', function() {
    console.log('Lost connection to garage #' + this.garage_id);
  });
  socket.on('closed', function() {
    currStatus = status.CLOSED;
  });
  socket.on('opened', function() {
    currStatus = status.OPEN;
  });
}

Garage.prototype.open = function() {
  console.log('Requesting garage #' + this.garage_id + ' door to open...');
  this.socket.emit('open');
}

Garage.prototype.close = function() {
  console.log('Requesting garage #' + this.garage_id + ' door to close...');
  this.socket.emit('close');
}

Garage.prototype.getStatus = function() {
  return this.status;
}

Garage.prototype.getId = function() {
  return this.garage_id;
}
