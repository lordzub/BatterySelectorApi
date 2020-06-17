// batteryModel.js
var mongoose = require('mongoose');
// Setup schema
var batterySchema = mongoose.Schema({
    name:String,
    batteryDescription: String,
    voltage:Number,
    capacity:Number,
    energy: Number,
    width:Number,
    height:Number,
    len:Number,
    weight:Number,
    cellWeight:Number,

});
// Export Battery model
var Battery = module.exports = mongoose.model('Batteries', batterySchema);
module.exports.get = function (callback, limit) {
    Battery.find(callback).limit(limit);
}