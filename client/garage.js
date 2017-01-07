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
		this.sensorPin.watch(function(val, err) {
			if(val == 0) {
				this.openedCallback();
			} else if (val == 1) {
				this.closedCallback();
			}
		});
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

    signalOpened() {
		// TODO: fix this
        this.socket.emit('opened');
    }

    signalClosed() {
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

	setOpenedCallback(cb) {
		this.openedCallback = cb;
	}

	setClosedCallback(cb) {
		this.closedCallback = cb;
	}
}

module.exports = Garage;
