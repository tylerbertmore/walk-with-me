const express = require('express');
const router = express.Router();


//-------------------------------------------- ROUTES
router.get('/', (req,res) => {
    res.send('users index');
})

module.exports = router