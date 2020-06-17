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


// Export API routes
module.exports = router;






