var fs = require('fs');
var socketio = require('socket.io-client');
var Garage = require('./garage.js');

// Parse config file
var config_file = fs.readFileSync('./config/config.json');
var config = JSON.parse(config_file);
var server = config['server'];
var garage_configs = config['garages'];
	
garage_configs.forEach(function(garage_config) {
	var garage = setupGarage(garage_config);
	setupSocket(garage);
});

function setupGarage(garage_config) {
	var id = garage_config['id'];
	var triggerPin = garage_config['triggerPin'];
	var sensorPin = garage_config['sensorPin'];
	return new Garage(id, triggerPin, sensorPin);
}

function setupSocket(garage) {
    var socket = socketio(
		server, 
		{ query: 'garageId=' + garage.getId() }
	);

    socket.on('connect', function() {
        console.log('Connected to server');
    });

    socket.on('open', function() {
        garage.open();
    });

    socket.on('close', function() {
        garage.close();
	});

    socket.on('disconnect', function() {
        console.log("socket disconnected");
    });
	
	garage.setOpenedCallback(function() {
		console.log("Garage opened");
		socket.emit('opened');
	});

	garage.setClosedCallback(function() {
		console.log("Garage closed");
		socket.emit('closed');
	});
}

