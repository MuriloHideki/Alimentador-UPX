const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    cep: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

const feederSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bowl: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    lastUpdateDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Feeder', feederSchema);
