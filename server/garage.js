module.exports = Garage;

function Garage(socket) {
  this.socket = socket;
  this.garage_id = socket.handshake.query.garage_id;
  console.log('Established connection with garage #' + this.garage_id);
  socket.on('disconnect', function() {
    console.log('Lost connection to garage #' + this.garage_id);
  })
}

Garage.prototype.open = function() {
  console.log('Requesting garage #' + this.garage_id + ' door to open...');
  this.socket.emit('open');
}

Garage.prototype.close = function() {
  console.log('Requesting garage #' + this.garage_id + ' door to close...');
  this.socket.emit('close');
}
