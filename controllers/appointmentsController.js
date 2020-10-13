const express = require('express');
const router = express.Router();


//-------------------------------------------- ROUTES

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


router.get('/', (req,res) => {
    res.send('appoints index');
})

module.exports = router
