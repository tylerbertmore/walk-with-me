const express = require('express');
const router = express.Router();


//-------------------------------------------- ROUTES
router.get('/', (req,res) => {
    res.send('appoints index');
})

module.exports = router