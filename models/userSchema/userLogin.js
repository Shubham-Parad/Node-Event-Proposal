const mongoose = require('mongoose');

const userLogin = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
});

const userLoginModel = mongoose.model('loginUser-data', userLogin);
module.exports = userLoginModel;