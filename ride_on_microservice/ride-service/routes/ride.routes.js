import { Router } from 'express';
import { body, query } from 'express-validator';
import { authUser, authCaptain } from '../middlewares/auth.middleware.js';
import { createRideHandler, getFareHandler, confirmRideHandler, startRideHandler, endRideHandler } from '../controllers/ride.controller.js';

const router = Router();

router.post('/create-ride',
    authUser,
    body('pickup').isString().isLength({ min: 3 }),
    body('destination').isString().isLength({ min: 3 }),
    body('vehicleType').isString().isIn(['auto', 'motorcycle', 'car']),
    createRideHandler
);

router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    getFareHandler
);

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRideHandler
);

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }),
    startRideHandler
);

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRideHandler
);

export default router;
