const express = require('express');
const router = express.Router();


//-------------------------------------------- ROUTES
router.get('/', (req,res) => {
    res.send('dogs index');
})

module.exports = router