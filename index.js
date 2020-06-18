// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }





app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))



var cors = require('cors')

app.use(cors())

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://127.0.0.1:27017/Batteries', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port


app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

passport.use(new LocalStrategy(
  function(username, password, done) {

    var passwordHash =process.env.PASSWORD

    bcrypt.compare(password, passwordHash, function(err, result) {
      if (result == false) {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });

      if (username != 'admin') {
        return done(null, false, { message: 'Incorrect username.' });
      }      
      return done(null, username);
   
  }
));


  passport.serializeUser((username, done) => done(null,username));
  passport.deserializeUser((username, done) => {
    return done(null, username)
  });


