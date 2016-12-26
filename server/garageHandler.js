module.exports = GarageHandler;

var garages = {};

function GarageHandler() {

}

GarageHandler.prototype.addGarage = function(garage) {
  var id = garage.getId();
  garages[id] = garage;
}

GarageHandler.prototype.openGarage = function(id) {
  var garage = garages[id];
  // TODO: Handler missing garage
  garage.open();
}

GarageHandler.prototype.closeGarage = function(id) {
  var garage = garages[id];
  // TODO: Handler missing garage
  garage.close();
}
