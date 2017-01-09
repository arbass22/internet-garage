"use strict"

var socketio = require('socket.io-client');
var Gpio = require('onoff').Gpio;

var status = {
	OPEN: 'open',
	CLOSED: 'closed'
};

class Garage {
    constructor(id, triggerPin, sensorPin) {
		// Store id to send to server
        this.id = id
		// Pin for triggering relay to close/open door
		// Initialized to high for use with low edge triggered relay
        this.triggerPin  = new Gpio(triggerPin, 'high');
		// Pin for reading door open/close status from magnetic switch
        this.sensorPin = new Gpio(sensorPin, 'in', 'both');
		// Set current status
		this.status = this.sensorPin.readSync() 
			? status.CLOSED 
			: status.OPEN;
		
		var self = this;
		// Flag used to ignore duplicate reads from magnetic switch
		this.watchFlag = false;
		this.sensorPin.watch(function(err, val) {
			if (self.watchFlag == false) {
				self.watchFlag = true;
				// Reset flag to false after 2 sec
				setTimeout(function() {
					self.watchFlag = false;
				}, 2000);

				if(val == 0) {	
					self.status = status.OPEN;
					self.openedCallback();
				} else if (val == 1) {
					self.status = status.CLOSED;
					self.closedCallback();
				}
			}
		});
	}

	getId() {
		return this.id;
	}

    open() {
		if (this.status == status.CLOSED) {
        	console.log("Opening garage door...");
			this.triggerRelay();
		}
	}

    close() {
		if (this.status == status.OPEN) {
    		console.log("Closing garage door...");
			this.triggerRelay();
		}
	}

    getStatus() {
        return this.status;
    }

	// Sets pin low for 1 sec then high again
	triggerRelay() {
		this.triggerPin.writeSync(0);
		var self = this;
		setTimeout(function() {
			self.triggerPin.writeSync(1);
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
