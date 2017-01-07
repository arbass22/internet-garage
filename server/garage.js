module.exports = Garage;

var status = {
    OPEN: 'open',
    CLOSED: 'closed',
    UNKNOWN: 'unknown'
};

function Garage(socket) {
    this.socket = socket;
    this.garageId = socket.handshake.query.garageId;
    this.status = status.UNKNOWN;
    console.log('Established connection with garage #' + this.garageId);
    var self = this;

    socket.on('disconnect', function() {
        console.log('Lost connection to garage #' + self.garageId);
        self.socket = null;
        self.garageId = null;
        self.status = status.UNKNOWN;
    });

    socket.on('closed', function() {
        console.log("Garage #" + this.garageId + " closed");
        self.status = status.CLOSED;
    });

    socket.on('opened', function() {
        console.log("Garage #" + this.garageId + " opened");
        self.status = status.OPEN;
    });
}

Garage.prototype.open = function() {
    console.log('Requesting garage #' + this.garageId + ' door to open...');
    this.socket.emit('open');
}

Garage.prototype.close = function() {
    console.log('Requesting garage #' + this.garageId + ' door to close...');
    this.socket.emit('close');
}

Garage.prototype.getStatus = function() {
    return this.status;
}

Garage.prototype.getId = function() {
    return this.garageId;
}
