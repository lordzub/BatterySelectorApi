// machineModel.js
var mongoose = require('mongoose');
// Setup schema
var MachineSchema = mongoose.Schema({
    model: String,
    OEM : String,
    catergory:String,
    voltage:Number,
    minCap:Number,
    maxCap:Number, 
    energy:Number,
    minWeight:Number,
    width:Number,
    len:Number,
    height:Number,
    verified:Boolean,
    
});
// Export Machine model
var Machine = module.exports = mongoose.model('Machines', MachineSchema);
module.exports.get = function (callback, limit) {
    Machine.find(callback).limit(limit);
}