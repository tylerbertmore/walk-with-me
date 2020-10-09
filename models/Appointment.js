const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    walker: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    walkedDog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dog'
    }],
    timeSlot: String
}, {timestamps: true})

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
