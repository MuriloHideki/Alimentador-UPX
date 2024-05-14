const mongoose = require('mongoose');

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
        type:String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    details: {
        type:String,
        required: true
    },
    lastUpdateDate: {
        type: Date,
        required: true
    }
});

feederSchema.statics.simulateMicrocontrollerUpdate = async function (id) {
    var feeder = await this.findById(id);

    if (!feeder) {
        throw new Error('Feeder not found');
    }

    let transferredAmount = 200;
    if (feeder.stock < 200) {
        transferredAmount = feeder.stock;
    }

    var newStock = feeder.stock - transferredAmount;
    var newBowl = feeder.bowl + transferredAmount;
    var lastUpdateDate = new Date();

    return this.findByIdAndUpdate(id, {
        stock: newStock,
        bowl: newBowl,
        lastUpdateDate
    }, { new: true });
};

module.exports = mongoose.model('Feeder', feederSchema);