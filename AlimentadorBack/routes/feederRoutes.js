const express = require('express');
const feederController = require('../controllers/feederController');

const router = express.Router();

router.route('/feeders')
    .post(feederController.createFeeder)
    .get(feederController.getAllFeeders);

router.route('/feeders/:id')
    .get(feederController.getFeederById)
    .put(feederController.updateFeeder)
    .delete(feederController.deleteFeeder);

router.route('/feeders/:id/bowl-and-stock')
    .put(feederController.updateBowlAndStockFeeder);

module.exports = router;
