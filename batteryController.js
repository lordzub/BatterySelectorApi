// batteryController.js
// Import battery model
Battery = require('./batteryModel');

var qs = require('qs');


// Handle index actions
exports.index = function (req, res) {
    Battery.get(function (err, battery) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            batteries: battery
        });
    });
};

// Handle create battery actions
exports.new = function (req, res) {
    // console.log(req.data);

    console.log(req.body.battery)
    var battery = new Battery();
    battery.name = req.body.battery.name,
    battery.batteryDescription = req.body.battery.batteryDescription,
    battery.voltage = req.body.battery.voltage,
    battery.capacity = req.body.battery.capacity,
    battery.energy = req.body.battery.energy,
    battery.width = req.body.battery.width,
    battery.height =  req.body.battery.height,
    battery.len = req.body.battery.len,
    battery.weight = req.body.battery.weight,
    battery.cellWeight = req.body.battery.cellWeight,
    battery.categories = req.body.battery.categories,
    battery.models = req.body.battery.models
    

    console.log(battery.name);
    // 
// save the battery and check for errors
    battery.save(function (err) {
        if (err){
            console.log(err);
         res.json(err);
        }
        else{
            console.log('Success')
        res.json({
            
            message: 'New battery created!',
            data: battery
        });
    }
    });

};
// Handle view battery info
exports.view = function (req, res) {
    Battery.findById(req.params.battery_id, function (err, battery) {
        if (err)
            res.send(err);
        res.json({
            message: 'Battery details loading..',
            data: battery
        });
    });
};
// Handle update battery info
exports.update = function (req, res) {
    Battery.findById(req.params.battery_id, function (err, battery) {
        console.log(req.body.battery);
        if (err)
            res.send(err);
            battery.name = req.body.battery.name
            battery.batteryDescription = req.body.battery.batteryDescription
            battery.voltage = req.body.battery.voltage
            battery.capacity = req.body.battery.capacity
            battery.energy = req.body.battery.energy
            battery.width = req.body.battery.width
            battery.len = req.body.battery.len
            battery.weight = req.body.battery.weight
            battery.cellWeight = req.body.battery.cellWeight

// save the battery and check for errors
        battery.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Battery Info updated',
                data: battery
            });
        });
    });
};
// Handle delete battery
exports.delete = function (req, res) {
    Battery.remove({
        _id: req.params.battery_id
    }, function (err, battery) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Battery deleted'
        });
    });
};