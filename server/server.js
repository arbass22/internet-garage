var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

var clients = {};

app.get('/', function(req, res) {
  res.json({message: "Hello"});
})

io.on('connection', function(socket){
  console.log(socket);
});

http.listen(port);
console.log("App listening on port " + port);
