const mongoose = require('mongoose');

const Proposal = new mongoose.Schema({
    eventName: {
        type: String,
        require: true,
    },
   eventPlace: {
        type: String,
        require: true,
    },
    proposalType : {
        type: String,
        require: true,
    },
    eventType: {
        type: String,
        require: true,
    },    
    budget: {
        type: Number,
        require: true,
    },
    fromDate:{
        type: String,
    },
    toDate:{
        type: String,
    },
    description: {
        type: String,
        require: true,
    },
    foodPreferences : {
        type: String,
        require: true,
    }, 
    events:{
        type: String,
        require: true,
    },
    images : {
        type: [String],
        require :true,
    }
},
)
module.exports = mongoose.model("Event" , Proposal);