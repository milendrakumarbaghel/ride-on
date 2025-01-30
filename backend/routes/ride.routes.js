const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');

router.post('/create-ride',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'motorcycle', 'car']).withMessage('Invalid vehicle type'),
    rideController.createRide
);

module.exports = router;
