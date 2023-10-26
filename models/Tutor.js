const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    availability: {
        type: Array,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'tutor'
    }
});

module.exports = mongoose.model('Tutor', tutorSchema);
