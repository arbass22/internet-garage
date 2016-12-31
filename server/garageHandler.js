module.exports = GarageHandler;

var garages = {};

function GarageHandler() {

}

GarageHandler.prototype.addGarage = function(garage) {
  var id = garage.getId();
  garages[id] = garage;
  garage.socket.on('disconnect', function() {
    delete garages[id];
  });
}

GarageHandler.prototype.openGarage = function(id) {
  var garage = garages[id];
  // TODO: Handle missing garage
  garage.open();
}

GarageHandler.prototype.closeGarage = function(id) {
  var garage = garages[id];
  // TODO: Handle missing garage
  garage.close();
}

GarageHandler.prototype.getStatus = function(id) {
  var garage = garages[id];
  // TODO: Handle missing garage
  return garage.getStatus();
}
