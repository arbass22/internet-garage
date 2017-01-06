"use strict"

var socketio = require('socket.io-client');
var Gpio = require('onoff').Gpio;

class Garage {
    constructor(garageId, triggerPin, sensorPin) {
		// Store id to send to server
        this.garageId = garageId
		// Pin for triggering relay to close/open door
        this.triggerPin  = new Gpio(triggerPin, 'out');
		this.triggerPin.setActiveLow(true);
		// Pin for reading door open/close status from magnetic switch
        this.sensorPin = new Gpio(sensorPin, 'in');

        // Create a socket to cloud server
        var socket = socketio(
			'http://192.168.1.13:3000', 
			{query: 'garageId=' + this.garageId}
		);

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
        this.socket.emit('opened');
    }

    signalClosed() {
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
