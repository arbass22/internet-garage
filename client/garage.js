"use strict"

var socketio = require('socket.io-client');
var Gpio = require('onoff').Gpio;

class Garage {
    constructor(id, triggerPin, sensorPin) {
		// Store id to send to server
        this.id = id
		// Pin for triggering relay to close/open door
        this.triggerPin  = new Gpio(triggerPin, 'out');
		this.triggerPin.setActiveLow(true); // Using low-level trigger relay
		// Pin for reading door open/close status from magnetic switch
        this.sensorPin = new Gpio(sensorPin, 'in');
	}

	getId() {
		return this.id;
	}

    open() {
        console.log("Opening garage door...");
		this.triggerRelay();
	}

    close() {
        console.log("Closing garage door...");
		this.triggerRelay();
	}

    isClosed() {
        return false;
    }

    signalOpened() {i
		// TODO: fix this
        this.socket.emit('opened');
    }

    signalClosed() {i
		// TODO: fix this
        this.socket.emit('closed');
    }

	// Sets pin high for 1 sec then low again
	triggerRelay() {
		this.triggerPin.writeSync(1);
		var self = this;
		setTimeout(function() {
			self.triggerPin.writeSync(0);
		}, 1000);
	}
}

module.exports = Garage;
