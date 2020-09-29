// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy



router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import battery controller
var batteryController = require('./batteryController');
var machineController = require('./machineController');
var authController = require('./authController')
// Battery routes
router.route('/battery')
    .get(batteryController.index)
    .post(batteryController.new);
    

router.route('/battery/:battery_id')
    .get(batteryController.view)
    .patch(batteryController.update)
    .put(batteryController.update)
    .delete(batteryController.delete);



router.route('/machines')
    .get(machineController.index)
    .post(machineController.new);
    

router.route('/machines/:machine_id')
    .get(machineController.view)
    .patch(machineController.update)
    .put(machineController.update)
    .delete(machineController.delete);


router.route('/auth')
    .post(passport.authenticate('local'), (req, res) => {
        res.status(200).json({"statusCode" : 200 ,"message" : "Successful"});
        });

router.route('/MachineUpload')
    .get(machineController.ImageGet)
    .post(machineController.ImageUpload)

router.route('/BatteryUpload')
    .get(batteryController.ImageGet)
    .post(batteryController.ImageUpload)


router.route('/BatteryPDFUpload')
    .get(batteryController.ImageGet)
    .post(batteryController.PDFUpload)



    


router.route('/UpdateBatteryImageUpload')
    .get(batteryController.UpdateImageGet)
    .post(batteryController.UpdateImageUpload)


router.route('/DeleteBatteryImage')
    .get(batteryController.UpdateImageGet)
    .post(batteryController.DeleteImage)


router.route('/DeleteBatteryPDF')
    .get(batteryController.UpdateImageGet)
    .post(batteryController.DeletePDF)


router.route('/DeleteMachineImage')
    .get(machineController.UpdateImageGet)
    .post(machineController.DeleteImage)
    
    
router.route('/DeleteMachinePDF')
    .get(machineController.UpdateImageGet)
    .post(machineController.DeletePDF)


router.route('/UpdateImageUpload')
    .get(machineController.UpdateImageGet)
    .post(machineController.UpdateImageUpload)


router.route('/MachinePDFUpload')
    .get(machineController.ImageGet)
    .post(machineController.PDFUpload)
    
// Export API routes
module.exports = router;






