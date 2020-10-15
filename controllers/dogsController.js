const express = require('express');
const router = express.Router();
const db = require('../models');


//-------------------------------------------- ROUTES

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You must sign in first');
    res.redirect('/login');
}

// paths assume '/dogs'

router.get('/', (req, res) => {
    db.Dog.find({}, (err, allDogs) => {
        err ? console.log(err) : res.render('dogs/index', {allDogs: allDogs})
    })
})

router.get('/:dogId', (req, res) => {
    db.Dog.findById(req.params.dogId, (err, foundDog) => {
        err ? console.log(err) : res.render('dogs/show', {dog: foundDog})
    })
})

router.post('/:dogId', isLoggedIn, (req, res) => {
    db.User.findById(req.user._id, (err, foundUser) => {
        if (err) console.log(err);
        db.Dog.findById(req.params.dogId, (err, foundDog) => {
            if (err) console.log(err);
            db.Appointment.create({
                walker: foundUser,
                walkedDog: foundDog,
            }, (err, newAppointment) => {
                err ? console.log(err) : res.redirect(`/users/${req.user._id}/dashboard`)
            })
        })
    })
})

router.put('/:dogId/:index', (req, res) => {
    let idx = req.params.index
    db.Dog.findByIdAndUpdate(req.params.dogId, 
        {$set: {[`schedule.${idx}`]:`${req.user.id}`}},
        {new: true},
        (err, foundDog) => {
        if (err) return console.log(err);
        db.User.findByIdAndUpdate(req.user.id, 
            {$set: {[`schedule.${idx}`]:`${req.params.dogId}`}},
            {new: true},
            (err, foundUser) => {
            err ? console.log(err) : res.redirect('back');            
        })
        
    })
})

module.exports = router
