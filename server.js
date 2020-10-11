//-------------------------------------------- MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();
const PORT = process.env.PORT;

//-------------------------------------------- VIEW ENGINE
app.set('view engine', 'ejs')


//-------------------------------------------- MIDDLEWARE
const ctrl = require('./controllers');
const db = require('./models');             
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

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
    db.User.create(req.body, (err, newUser) => {
        if(err) return console.log(err)
        res.redirect('/');
    })
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
