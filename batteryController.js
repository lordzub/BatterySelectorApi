// batteryController.js
// Import battery model
Battery = require('./batteryModel');

var qs = require('qs');



const path = require('path');

const multer = require('multer');
DIR = './uploads/batteries';

var fs = require('fs');

PicName ='PicName';
PDFName = '';


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
    battery.models = req.body.battery.models,
    battery.image = req.body.battery.image,
    battery.pdf = req.body.battery.pdf,
    
    this.PicName= this.PDFName = battery.name
    console.log(battery.name);


    if(battery.image | battery.pdf){
    this.DIR = './uploads/batteries/' ;
    

    if (!fs.existsSync(this.DIR)){
        fs.mkdirSync(this.DIR);
    }

    this.DIR=DIR+''+this.PicName

    if (!fs.existsSync(this.DIR)){
        fs.mkdirSync(this.DIR);
    }
}

// 
// save the battery and check for errors
    battery.save(function (err) {
        if (err){
            console.log(err);
         res.json(err);
        }
        else{
            console.log('Successful')
        res.json({
            
            message: 'Successful',
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
            battery.image = req.body.battery.image
            battery.pdf = req.body.battery.pdf


            this.PicName = battery.name
// save the battery and check for errors

        console.log(battery)
        battery.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Battery Info Updated',
                data: battery

            });
        });
    });
};
// Handle delete battery
exports.delete = function (req, res) {
     

    Battery.findById(req.params.battery_id, function (err, battery) {
        if (err)
            res.send(err);

            
        // console.log(machine)
        if(battery.image){
            DelPic = battery.name+'.png';


            DelDIR = 'batteries/'+battery.name+'/';


            var Del = DelDIR+'/'+DelPic;
            if (fs.existsSync(DelDIR)){
                console.log('There is a directory: '+DelDIR)
                
                try {
                    fs.unlinkSync(Del)
                
                    console.log(`${Del} is deleted!`);
                } catch (err) {
                    console.error(`Error while deleting ${Del}.`);
                }


                console.log('The file is deleted')
            }
            console.log('This is the pictures name '+DelPic)
        }
        else{
            console.log('there is no image')
        }

        if(battery.pdf)
        {
            const path = './uploads/batteries/'+battery.name+'/'+battery.name+'.pdf';
            try {
                fs.unlinkSync(path)
                console.log(battery.name+'.pdf has been removed')
              } catch(err) {
                console.error(err)
              }
        
        


        }
    });


    Battery.deleteOne({
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



function SetName(Name){
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, this.DIR);
        },
        filename: (req, file, cb) => {
            console.log('----------------')
            console.log(this.PicName)
            console.log('----------------')
          cb(null, this.PicName+'.png');
        }
    });

    let upload = multer({storage: storage});
    return upload


}


function SetPDFName(Name){
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, this.DIR);
        },
        filename: (req, file, cb) => {
            console.log('----------------')
            console.log(this.PDFName)
            console.log('----------------')
          cb(null, this.PDFName+'.pdf');
        }
    });

    let upload = multer({storage: storage});
    return upload


}



exports.UpdateImageGet = function (req, res) {
    res.end('file catcher example');
};

exports.ImageGet = function (req, res) {
    res.end('file catcher example');
};

exports.PDFUpload = SetPDFName(this.PDFName).single('file'); 

exports.ImageUpload = SetName(this.PicName).single('file');

exports.UpdateImageUpload = SetName(this.PicName).single('file');


exports.DeleteImage = function(req,res){

    var name = req.body.name
    const path = './uploads/batteries/'+name+'/'+name+'.png'
    try {
        fs.unlinkSync(path)
        console.log(name+'.png has been removed')
      } catch(err) {
        console.error(err)
      }


    res.json({
        status: "success",
        message: 'Battery Image Deleted'
    });

}


exports.DeletePDF = function(req,res){
    console.log('PDF DELETED')
    var name = req.body.name
    const path = './uploads/batteries/'+name+'/'+name+'.pdf'
    try {
        fs.unlinkSync(path)
        console.log(name+'.pdf has been removed')
      } catch(err) {
        console.error(err)
      }


    res.json({
        status: "success",
        message: 'Battery PDF Deleted'
    });

}