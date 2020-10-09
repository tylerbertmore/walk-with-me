const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    birthDate: Date,
    sex: String,
    img: String
}, {timestamps: true})

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
