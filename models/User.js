const mongoose =require ('mongoose');

const registerUser = new mongoose.Schema({

    username:{
        type:String,
        require:true,
        unique:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    contact:{
        type:Number,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true,
    }

})
module.exports = mongoose.model("User",registerUser)