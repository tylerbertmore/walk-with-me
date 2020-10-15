const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    fullName: String,
    gender: String,
    userImg: {        
        type: String,
        default: '/images/default-user.png'
    },
    birthday: Date,
    email: String,
    favDog: String,
    schedule: {
        type: Array,
        default: [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,]
    }
}, {timestamps: true})


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
