const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    fullName: {
        type: String,
    },
    gender: String,
    userImg: String,
    birthday: Date,
    email: String

}, {timestamps: true})


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
