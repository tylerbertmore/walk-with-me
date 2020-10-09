//-------------------------------------------- MODULES
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

//-------------------------------------------- VIEW ENGINE
app.set('view engine', 'ejs')


//-------------------------------------------- MIDDLEWARE

// MORGAN REPLACEMENT
app.use((req, res, next) => {
    const method = req.method;
    const path = req.url;
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${method} ${path} ${timestamp}`);
    next(); // Allow the request to move on to the next middleware in the chain
  });
//-------------------------------------------- ROUTES
app.get('/', (req, res) => {
    res.render('index');
})



//-------------------------------------------- LISTENER
app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`)
})
