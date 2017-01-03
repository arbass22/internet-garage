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
  if (garage == null) {
    return false;
  }
  garage.open();
  return true;
}

GarageHandler.prototype.closeGarage = function(id) {
  var garage = garages[id];
  if (garage == null) {
    return false;
  }
  garage.close();
  return true;
}

GarageHandler.prototype.getStatus = function(id) {
  var garage = garages[id];
  if (garage == null) {
    return false
  }
  return garage.getStatus();
}
