const mongoose = require('mongoose');

const feederSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    type: {
        type:String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    lastUpdateDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Feeder', feederSchema);
