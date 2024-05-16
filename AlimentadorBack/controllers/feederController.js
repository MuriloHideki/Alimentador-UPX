const Feeder = require('../models/feederModel');
const History = require('../models/historyModel');

exports.createFeeder = async (req, res) => {
    try {
        const { name, bowl, stock, type, details, address } = req.body;
        const lastUpdateDate = new Date();
        const feeder = await Feeder.create({ name, bowl, stock, type, address, details, lastUpdateDate });
        
        await History.create({ feederId: feeder._id, updateDate: lastUpdateDate, stock, bowl });
        
        res.status(201).json({ status: 'success', data: { feeder } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getAllFeeders = async (req, res) => {
    try {
        const feeders = await Feeder.find();
        res.status(200).json({ status: 'success', data: { feeders } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getFeederById = async (req, res) => {
    try {
        const feeder = await Feeder.findById(req.params.id);
        if (!feeder) {
            return res.status(404).json({ status: 'fail', message: 'Feeder not found' });
        }
        res.status(200).json({ status: 'success', data:  feeder  });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateFeeder = async (req, res) => {
    try {
        const { bowl, stock } = req.body;
        const lastUpdateDate = new Date();

        let feeder = await Feeder.findById(req.params.id);
        if (!feeder) {
            return res.status(404).json({ status: 'fail', message: 'Feeder not found' });
        }

        feeder.bowl = bowl;
        feeder.stock = stock;
        feeder.lastUpdateDate = lastUpdateDate;

        await feeder.save();
        await History.create({ feederId: feeder._id, updateDate: lastUpdateDate, stock, bowl });

        if (feeder.bowl <= 100 && feeder.stock !== 0) {

            // Simular um delay de 2 minutos para a operação de reabastecimento
            //await new Promise(resolve => setTimeout(resolve, 120000));

            let transferredAmount = 200;
            if (feeder.stock < 200) {
                transferredAmount = feeder.stock;
            }

            feeder.stock -= transferredAmount;
            feeder.bowl += transferredAmount;
            feeder.lastUpdateDate = new Date();

            await feeder.save();
            await History.create({ feederId: feeder._id, updateDate: feeder.lastUpdateDate, stock: feeder.stock, bowl: feeder.bowl });
        }

        res.status(200).json({ status: 'success', data: { feeder: { bowl: feeder.bowl, stock: feeder.stock } } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.deleteFeeder = async (req, res) => {
    try {
        const feeder = await Feeder.findByIdAndDelete(req.params.id);
        if (!feeder) {
            return res.status(404).json({ status: 'fail', message: 'Feeder not found' });
        }
        await History.deleteMany({ feederId: feeder._id });
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateBowlAndStockFeeder = async (req, res) => {
    try {
        let feeder = await Feeder.findById(req.params.id);
        if (!feeder) {
            return res.status(404).json({ status: 'fail', message: 'Feeder not found' });
        }

        feeder.bowl = req.body.bowl;
        feeder.stock = req.body.stock;
        feeder.lastUpdateDate = new Date();

        await feeder.save();
        await History.create({ feederId: feeder._id, updateDate: feeder.lastUpdateDate, stock: feeder.stock, bowl: feeder.bowl });

        if (feeder.bowl <= 100) {
            if (feeder.stock === 0) {
                return res.status(400).json({ status: 'fail', message: 'Feeder stock empty' });
            }

            // Simular um delay de 2 minutos para a operação de reabastecimento
            //await new Promise(resolve => setTimeout(resolve, 120000));

            let transferredAmount = 200;
            if (feeder.stock < 200) {
                transferredAmount = feeder.stock;
            }

            feeder.stock -= transferredAmount;
            feeder.bowl += transferredAmount;
            feeder.lastUpdateDate = new Date();

            await feeder.save();
            await History.create({ feederId: feeder._id, updateDate: feeder.lastUpdateDate, stock: feeder.stock, bowl: feeder.bowl });
        }

        res.status(200).json({ status: 'success', data: { feeder: { bowl: feeder.bowl, stock: feeder.stock } } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getHistoryByFeederId = async (req, res) => {
    try {
        const history = await History.find({ feederId: req.params.id }).sort({ updateDate: -1 });
        res.status(200).json({ status: 'success', data: { history } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};