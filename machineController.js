// machineController.js
// Import machine model
Machine = require('./machineModel');

var qs = require('qs');


// Handle index actions
exports.index = function (req, res) {
    Machine.get(function (err, machine) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            machines: machine
        });
    });
};

// Handle create machine actions
exports.new = function (req, res) {
    // console.log(req.data);

    console.log(req.body.machine)
    var machine = new Machine();
    machine.OEM = req.body.machine.OEM,
    machine.catergory = req.body.machine.catergory,
    machine.model = req.body.machine.model,
    machine.voltage =  req.body.machine.voltage,
    machine.minCap = req.body.machine.minCap,
    machine.maxCap = req.body.machine.maxCap,
    machine.energy =  req.body.machine.energy,
    machine.minWeight = req.body.machine.minWeight,
    machine.width = req.body.machine.width,
    machine.len = req.body.machine.len,
    machine.height = req.body.machine.height,
    machine.verified = req.bode.machine.verified,

    
    console.log(machine);
//     // 
// // save the machine and check for errors
    machine.save(function (err) {
        if (err){
            console.log(err);
         res.json(err);
        }
        else{
            console.log('Success')
        res.json({
            
            message: 'New machine created!',
            data: machine
        });
    }
    });

};
// Handle view machine info
exports.view = function (req, res) {
    Machine.findById(req.params.machine_id, function (err, machine) {
        if (err)
            res.send(err);
        res.json({
            message: 'Machine details loading..',
            data: machine
        });
    });
};
// Handle update machine info
exports.update = function (req, res) {
    Machine.findById(req.params.machine_id, function (err, machine) {
        console.log(req.body.bat);
        if (err)
            res.send(err);
            machine.OEM = req.body.machine.OEM,
            machine.catergory = req.body.machine.catergory,
            machine.model = req.body.machine.model,
            machine.voltage =  req.body.machine.voltage,
            machine.minCap = req.body.machine.minCap,
            machine.maxCap = req.body.machine.maxCap,
            machine.energy =  req.body.machine.energy,
            machine.minWeight = req.body.machine.minWeight,
            machine.width = req.body.machine.width,
            machine.len = req.body.machine.len,
            machine.height = req.body.machine.height,
            machine.verified = req.body.machine.verified,
// save the machine and check for errors
        machine.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Machine Info updated',
                data: machine
            });
        });
    });
};
// Handle delete machine
exports.delete = function (req, res) {
    Machine.remove({
        _id: req.params.machine_id
    }, function (err, machine) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Machine deleted'
        });
    });
};