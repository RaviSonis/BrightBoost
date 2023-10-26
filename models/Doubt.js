const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
    doubtNo: {
        type: Number,
        required: true,
        unique: true
    },
    studentID: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    sessionDate: {
        type: String,
        required: true,
    },
    sessionTime: {
        type: String,
        enum: ['3:30 - 4:30', '4:30 - 5:30'], 
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    doubtTitle: {
        type: String,
        required: true
    },
    doubtDetail: {
        type: String,
        required: true
    },
    status: {  // Added status field
        type: String,
        enum: ['Pending', 'Solved', 'Not Solved'], 
        required: true,
        default: 'Pending'
    }
});

const Doubt = mongoose.model('Doubt', doubtSchema);

module.exports = Doubt;
