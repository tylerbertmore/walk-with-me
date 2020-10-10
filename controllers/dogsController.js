const express = require('express');
const router = express.Router();
const db = require('../models');

//--------------------------------- SEED DOGS
const firstDogs = require('../models/dogs.js');

db.Dog.insertMany(firstDogs, (err, newDogs) => {
    err ? console.log(err) : console.log(newDogs);
})

//-------------------------------------------- ROUTES
// paths assume '/dogs'

router.get('/', (req,res) => {
    res.send('dogs index');
})

router.get('/:dogId', (req, res) => {
    db.Dog.findById(req.params.dogId, (err, foundDog) => {
        err ? console.log(err) : res.render('dogs/show', {dog: foundDog})
    })
})

module.exports = router
