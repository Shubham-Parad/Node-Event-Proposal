const mongoose = require('mongoose');
const validator = require('validator');

const createLogin = new mongoose.Schema({
    email: {
        type: String,
        //  validates and sanitizes strings only.
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("error")
            }
        }
    },
    contact: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        require: true
    },
    password: {
        type: String,
        require: true,
    }
});

const venderLoginModel = mongoose.model('loginVender-data', createLogin);
module.exports = venderLoginModel;