// machineController.js
// Import machine model
Machine = require('./machineModel');
const path = require('path');
var qs = require('qs');
const multer = require('multer');
DIR = './uploads';

var fs = require('fs');



 


PicName ='PicName';


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
    machine.verified = req.body.machine.verified,
    machine.image = req.body.machine.image,
    machine.pdf = req.body.machine.pdf

    console.log(machine.image)
    
    if (machine.image || machine.pdf ){
    this.DIR = './uploads/machines/' ;
    

    if (!fs.existsSync(this.DIR)){
        fs.mkdirSync(this.DIR);
    }


    this.DIR = './uploads/machines/'+ machine.OEM ;
    
    if (!fs.existsSync(this.DIR)){
        fs.mkdirSync(this.DIR);
    }

    this.DIR = './uploads/machines/'+ machine.OEM+'/'+machine.catergory;
    
    if (!fs.existsSync(this.DIR)){
        fs.mkdirSync(this.DIR);
    }

    this.DIR = './uploads/machines/'+ machine.OEM+'/'+machine.catergory+'/'+machine.model;
    
    if (!fs.existsSync(this.DIR)){
        fs.mkdirSync(this.DIR);
    }
}

    this.PicName = machine.OEM +' '+machine.catergory+' '+machine.model;

    SetName(this.PicName)
    
    machine.save(function (err) {
        if (err){
            console.log(err);
         res.json(err);
        }
        else{
            console.log('Success')
            res.json({
                message:'Successful',
                PicName: PicName
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
        machine.image = req.body.machine.image,
        machine.pdf = req.body.machine.pdf;

        console.log(machine.image)


                if (req.body.machine.image==true){
                    this.DIR = './uploads/machines/' ;
                    
                
                    if (!fs.existsSync(this.DIR)){
                        fs.mkdirSync(this.DIR);
                    }
                
                
                    this.DIR = './uploads/machines/'+ machine.OEM ;
                    
                    if (!fs.existsSync(this.DIR)){
                        fs.mkdirSync(this.DIR);
                    }
                
                    this.DIR = './uploads/machines/'+ machine.OEM+'/'+machine.catergory;
                    
                    if (!fs.existsSync(this.DIR)){
                        fs.mkdirSync(this.DIR);
                    }
                
                    this.DIR = './uploads/machines/'+ machine.OEM+'/'+machine.catergory+'/'+machine.model;
                    
                    if (!fs.existsSync(this.DIR)){
                        fs.mkdirSync(this.DIR);
                    }
                
                    this.PicName =machine.OEM +' '+machine.catergory+' '+machine.model;
                    
                    DelPic = machine.OEM +' '+machine.catergory+' '+machine.model+'.png';


                    // DelDIR = './uploads/machines/'+machine.OEM+'/'+machine.catergory+'/'+machine.model;
        
        

                    

                    
            }
// save the machine and check for errors
        machine.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Machine Info Updated',
                data: machine,
                PicName:'There is an image and this is the name '+this.PicName
            });
        });
    });
};
// Handle delete machine
exports.delete = function (req, res) {
    //Delete Image and Drictory
    console.log(req.params)

    Machine.findById(req.params.machine_id, function (err, machine) {
        if (err)
            res.send(err);

            
        // console.log(machine)
        if(machine.image){
            DelPic = machine.OEM +' '+machine.catergory+' '+machine.model+'.png';


            DelDIR = './uploads/machines/'+machine.OEM+'/'+machine.catergory+'/'+machine.model;


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

        if(machine.pdf)
        {
            const path = './uploads/machines/'+machine.OEM+'/'+machine.catergory+'/'+machine.model+'/'+machine.OEM+' '+machine.catergory+' '+machine.model+'.pdf';
            try {
                fs.unlinkSync(path)
                console.log(machine.OEM+' '+machine.catergory+' '+machine.model+'.pdf has been removed')
              } catch(err) {
                console.error(err)
              }
        
        
           

        }
    });





    //Deletes from mongoDB
    Machine.deleteOne({
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


exports.ImageGet = function (req, res) {
    res.end('file catcher example');
};

exports.UpdateImageGet = function (req, res) {
    res.end('file catcher example');
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

exports.DeleteImage = function (req,res){

    
    var url = req.body.url
    console.log(url)
    
    const path = './uploads/machines/'+url
    console.log(path)
    try {
        fs.unlinkSync(path)
        console.log(url+'has been removed')
      } catch(err) {
        console.error(err)
      }


    res.json({
        status: "success",
        message: 'Machine Image Deleted'
    });
}



function SetPDFName(Name){
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, this.DIR);
        },
        filename: (req, file, cb) => {
            console.log('----------------')
            console.log(this.PicName)
            console.log('----------------')
          cb(null, this.PicName+'.pdf');
        }
    });

    let upload = multer({storage: storage});
    return upload


}


exports.DeletePDF = function(req,res){
    console.log('PDF DELETED')
    var name = req.body.name
    const path = './uploads/machines/'+name+'.pdf'
    try {
        fs.unlinkSync(path)
        console.log(name+'.pdf has been removed')
      } catch(err) {
        console.error(err)
      }


    res.json({
        status: "success",
        message: 'Machine PDF Deleted'
    });

}

exports.PDFUpload = SetPDFName(this.PicName).single('file'); 

exports.ImageUpload = SetName(this.PicName).single('file');

exports.UpdateImageUpload = SetName(this.PicName).single('file');