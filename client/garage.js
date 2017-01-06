"use strict"

var socketio = require('socket.io-client');

class Garage {
    constructor(garageId, triggerPin, sensorPin) {
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

    open() {
        console.log("Opening garage door...");
    }

    close() {
        console.log("Closing garage door...");
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
}

module.exports = Garage;
