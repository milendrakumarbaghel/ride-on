const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');

router.post('/create-ride',
    body('userId').isString().isLength({ min: 24, max: 24 }).withMessage('Invalid user id'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    authMiddleware.authUser,
    rideController.createRide
);
