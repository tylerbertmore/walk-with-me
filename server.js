//-------------------------------------------- MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local');
require('dotenv').config();
const PORT = process.env.PORT;



//-------------------------------------------- VIEW ENGINE
app.set('view engine', 'ejs')


//-------------------------------------------- MIDDLEWARE
app.use(express.static(__dirname + '/public'));
const ctrl = require('./controllers');
const db = require('./models');             
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));




app.use(require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true, // what does this do?
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

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
app.post('/signup', async (req, res) => {
    const newUser = new db.User({username: req.body.username, fullName: req.body.fullName, gender: req.body.gender, birthday: req.body.birthday})
    const registeredUser = await db.User.register(newUser, req.body.password)
    req.login(registeredUser, err => {
        if(err) return console.log(err)
        res.redirect(`users/${req.user._id}/dashboard`);
    })
})

// Login route
app.get('/login', (req, res) => {
    res.render('users/login');
});

app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Successfully logged in');
    res.redirect('/users');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('dogs')
})

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
