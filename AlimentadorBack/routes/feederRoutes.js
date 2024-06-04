const express = require('express');
const feederController = require('../controllers/feederController');

const router = express.Router();

router.route('/feeders')
    .post(feederController.createFeeder)
    .get(feederController.getAllFeeders);

router.get('/feeders/cities', feederController.getCities);
router.get('/feeders/neighborhoods/:city', feederController.getNeighborhoodsByCity);

router.get('/feeders/search', feederController.getFeedersByCityAndNeighborhood);
    
router.route('/feeders/:id')
    .get(feederController.getFeederById)
    .put(feederController.updateFeeder)
    .delete(feederController.deleteFeeder);

router.route('/feeders/:id/bowl-and-stock')
    .put(feederController.updateBowlAndStockFeeder);

router.route('/feeders/:id/history')
    .get(feederController.getHistoryByFeederId);



module.exports = router;
