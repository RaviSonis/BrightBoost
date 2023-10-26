const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (date) {
                // Ensure the session date is not in the past
                return date >= new Date();
            },
            message: 'Session date cannot be in the past',
        },
    },
    sessionTime: {
        type: String,
        enum: ['3:30 - 4:30', '4:30 - 5:30'],
        required: true,
    },
    tutor: {
        type: String,
        ref: 'Tutor',
        required: true,
    },
    attendance: {
        type: String,
        required: true,
    },
    doubts: {
        type: String,
    },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;