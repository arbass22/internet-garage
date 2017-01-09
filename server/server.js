var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var Garage = require('./garage.js');
var GarageHandler = require('./garageHandler.js');
var validator = require('./validator.js');

var port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator);

var garageHandler = new GarageHandler();

app.post('/open/:id', function(req, res) {
    var success = garageHandler.openGarage(req.params.id);
    if (success) {
        res.status(200).send('Success');
    } else {
        res.status(404).send('Garage not found');
    }
});

app.post('/close/:id', function(req, res) {
    var success = garageHandler.closeGarage(req.params.id);
    if (success) {
        res.status(200).send('Success');
    } else {
        res.status(404).send('Garage not found');
    }
});

app.get('/status/:id', function(req, res) {
    var status = garageHandler.getStatus(req.params.id);
    res.send(status);
})

io.on('connection', function(socket){
    var garage = new Garage(socket);
    garageHandler.addGarage(garage);
});

http.listen(port);
console.log("App listening on port " + port);
