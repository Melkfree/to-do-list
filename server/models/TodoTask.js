const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    check: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);