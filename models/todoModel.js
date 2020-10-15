const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});


module.exports = mongoose.model('Todo', todoSchema);