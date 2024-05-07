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

module.exports = router;
