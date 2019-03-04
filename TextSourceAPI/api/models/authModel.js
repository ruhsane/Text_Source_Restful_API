const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: password,
        required: true
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
