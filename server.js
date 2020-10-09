const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    console.log('terminal hellloooo');
    res.send('helllooooo')
})

app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`)
})
