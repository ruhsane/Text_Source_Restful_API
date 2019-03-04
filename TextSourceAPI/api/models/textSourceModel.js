const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSourceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // file: {
    //     type: file,
    //     required: true
    // },
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Text_Source', textSourceSchema);
