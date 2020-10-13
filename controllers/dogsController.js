const express = require('express');
const router = express.Router();
const db = require('../models');

//--------------------------------- SEED DOGS
const firstDogs = require('../models/dogs.js');

// db.Dog.insertMany(firstDogs, (err, newDogs) => {
//     err ? console.log(err) : null //console.log(newDogs);
// })

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


module.exports = router
