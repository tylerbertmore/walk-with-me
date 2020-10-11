const express = require('express');
const router = express.Router();
const db = require('../models');


//-------------------------------------------- ROUTES
// all routes assume '/users'

// render dashboard upon logging in
router.get('/:user', (req,res) => {
    db.User.findById(req.params.user, (err, foundUser) => {
        // add appointments query
        err ? console.log(err) : res.render('users/dashboard', {user: foundUser})
    })
})

// render page with just user info
router.get('/:user/show', (req, res) => {
    db.User.findById(req.params.user, (err, foundUser) => {
        err ? console.log(err) : res.render('users/show', {user: foundUser})
    })
})

// render page to edit or delete account
router.get('/:user/edit', (req, res) => {
    db.User.findById(req.params.user, (err, foundUser) => {
        err ? console.log(err) : res.render('users/edit', {user: foundUser})
    })
})

// update account info in database
router.put('/:user', (req, res) => {
    db.User.findByIdAndUpdate(req.params.user,
        req.body,
        {new: true},
        (err, updated) => {
            err ? console.log(err) : res.redirect(`${updated._id}`)
    })
})

// delete account from database
router.delete('/:user', (req, res) => {
    db.User.findByIdAndDelete(req.params.user, (err, deleted) => {
        err ? console.log(err) : res.redirect('../')
    })
})

module.exports = router
