var qs = require('qs');
var bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const initializePassport = require('./passport-config')


exports.login = async function (req,res) {
    res.json({
        message:'sucess'
    });


};





