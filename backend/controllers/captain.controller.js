const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const { fullName, email, password, vehicle } = req.body;

        const existingCaptain = await captainModel.findOne({ email });

        if (existingCaptain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = await captain.generateAuthToken();

        res.status(201).json({ token, captain });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = await captain.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({ token, captain });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        await blacklistTokenModel.create({ token }); // Add token to blacklist

        res.clearCookie('token');

        res.status(200).json({ message: 'Captain logged out successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
