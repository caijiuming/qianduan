cordova.define("com.rensanning.cordova.carrier.carrier", function(require, exports, module) {
var cordova = require('cordova');

var Carrier = function() {};

Carrier.prototype.getCarrierCode = function(success, error) {
    cordova.exec(success, error, 'CarrierPlugin', 'getCarrierCode', []);
};

var carrier = new Carrier();
module.exports = carrier;
});
