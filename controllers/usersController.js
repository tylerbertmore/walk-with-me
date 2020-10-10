const express = require('express');
const router = express.Router();
const db = require('../models');


//-------------------------------------------- ROUTES
// all routes assume '/users'

router.get('/', (req,res) => {
    res.send('users index');
})

router.get('/:user', (req, res) => {
    db.User.findById(req.params.user, (err, foundUser) => {
        err ? console.log(err) : res.render('users/show', {user: foundUser})
    })
})

router.get('/:user/edit', (req, res) => {
    db.User.findById(req.params.user, (err, foundUser) => {
        err ? console.log(err) : res.render('users/edit', {user: foundUser})
    })
})

router.put('/:user', (req, res) => {
    db.User.findByIdAndUpdate(req.params.user,
        req.body,
        {new: true},
        (err, updated) => {
            err ? console.log(err) : res.redirect(`${updated._id}`)
    })
})

module.exports = router
