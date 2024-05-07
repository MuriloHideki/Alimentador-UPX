const Feeder = require('../models/feederModel');

exports.createFeeder = async (req, res) => {
    try {
        const { name, weight, type, address } = req.body;
        const lastUpdateDate = new Date();
        const feeder = await Feeder.create({ name, weight, type,address, lastUpdateDate });
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
        res.status(200).json({ status: 'success', data: { feeder } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateFeeder = async (req, res) => {
    try {
        const lastUpdateDate = new Date();
        const feeder = await Feeder.findByIdAndUpdate(req.params.id, 
            { ...req.body, lastUpdateDate }, 
            { new: true, runValidators: true }
        );
        if (!feeder) {
            return res.status(404).json({ status: 'fail', message: 'Feeder not found' });
        }
        res.status(200).json({ status: 'success', data: { feeder } });
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
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
