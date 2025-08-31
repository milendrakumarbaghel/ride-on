import { Router } from 'express';
import { body } from 'express-validator';
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain, toggleAvailability } from '../controllers/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';
import { updateLocation } from '../controllers/location.controller.js';
import { getCaptainsInRadius } from '../controllers/geo.controller.js';

const router = Router();

router.post('/register', [
    body('email').isEmail().withMessage('Email is not valid'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle or auto')
], registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], loginCaptain);

router.get('/profile', authCaptain, getCaptainProfile);
router.get('/logout', authCaptain, logoutCaptain);
router.post('/location', authCaptain, updateLocation);
router.get('/captains-in-radius', getCaptainsInRadius);
router.put('/toggle-availability', authCaptain, captainController.toggleAvailability);

export default router;
