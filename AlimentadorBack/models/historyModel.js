const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    feederId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feeder',
        required: true
    },
    updateDate: {
        type: Date,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    bowl: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('History', historySchema);
