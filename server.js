//-------------------------------------------- MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
require('dotenv').config();
const PORT = process.env.PORT;



//-------------------------------------------- VIEW ENGINE
app.set('view engine', 'ejs')


//-------------------------------------------- MIDDLEWARE
const ctrl = require('./controllers');
const db = require('./models');             
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.use(require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());



// MORGAN REPLACEMENT
app.use((req, res, next) => {
    const method = req.method;
    const path = req.url;
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${method} ${path} ${timestamp}`);
    next(); // Allow the request to move on to the next middleware in the chain
  });


//-------------------------------------------- ROUTES
// Root route
app.get('/', (req, res) => {
    res.render('index');
});

// Signup route
    //get
app.get('/signup', (req, res) => {
    res.render('users/signup');
});
    //post
app.post('/signup', (req, res) => {
    const newUser = new db.User({username: req.body.username, fullName: req.body.fullName, gender: req.body.gender, birthday: req.body.birthday})
    db.User.register(newUser, req.body.password), (err, user) => {
        if(err) return console.log(err)
        
    }
    res.redirect('signup')
})

// Login route
app.get('/login', (req, res) => {
    res.render('users/login');
});



// Users controller
app.use('/users', ctrl.users);
// Dogs controller
app.use('/dogs', ctrl.dogs);
//Appointments controller
app.use('/appointments', ctrl.appointments);


//404
app.get('*', (req, res) => {
    res.render('404');
})


//-------------------------------------------- LISTENER
app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`)
})
