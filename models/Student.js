const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentID: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
