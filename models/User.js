const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'tutor'],
        required: true
    }
});

// Optional: Hashing password before saving
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
});

module.exports = mongoose.model('User', userSchema);
