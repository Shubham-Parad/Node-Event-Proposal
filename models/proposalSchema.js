const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({

    vendorName: {
        type: String,
    },
    vendorId: {
        type: String
    },
    vendorEmail: {
        type: String,

    },
    eventName: {
        type: String,
        require: true,
    },
    eventPlace: {
        type: String,
        require: true,
    },
    proposalType: {
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
    fromDate: {
        type: Date,
    },
    toDate: {
        type: Date,
    },
    description: {
        type: String,
        require: true,
    },
    foodPreferences: {
        type: String,
        require: true,
    },
    events: {
        type: String,
        require: true,
    },
    images: {
        type: String,
        require: true,
    }
}
)

const proposalModel = mongoose.model("proposal-data", proposalSchema);
module.exports = proposalModel;