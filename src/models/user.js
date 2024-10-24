const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true // Automatically remove whitespace
    },
    username: {
        type: String,
        default: 'Unknown'
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    usageCount: {
        type: Number,
        default: 0
    },
    lastMessage: {
        type: String,
        default: ''
    },
    lastInteraction: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to update the `lastInteraction` field whenever the document is updated
userSchema.pre('save', function(next) {
    this.lastInteraction = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
