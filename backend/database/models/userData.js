const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        minlength: 3
    },
    surname : {
        type: String,
        trim: true,
        minlength: 3
    },
    address : {
        type: String,
        trim: true,
        minlength: 3
    }
});

const userData = mongoose.model('userData', userSchema)

module.exports = userData;