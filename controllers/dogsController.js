const express = require('express');
const router = express.Router();
const db = require('../models');

//--------------------------------- SEED DOGS
const firstDogs = require('../models/dogs.js');

db.Dog.insertMany(firstDogs, (err, newDogs) => {
    err ? console.log(err) : null //console.log(newDogs);
})

//-------------------------------------------- ROUTES
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

router.post('/:dogId', (req, res) => {
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


module.exports = router
