import blacklistTokenModel from '../models/blacklistToken.model.js';
import captainModel from '../models/captain.model.js';
import { createCaptain } from '../services/captain.service.js';
import { validationResult } from 'express-validator';

export async function registerCaptain(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });
        const { fullName, email, password, vehicle } = req.body;
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) return res.status(400).json({ message: 'Captain already exists' });
        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        const token = captain.generateAuthToken();
        return res.status(201).json({ token, captain });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

export async function loginCaptain(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) return res.status(401).json({ message: 'Invalid email or password' });
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        return res.status(200).json({ token, captain });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

export async function getCaptainProfile(req, res) {
    return res.status(200).json({ captain: req.captain });
}

export async function logoutCaptain(req, res) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (token) await blacklistTokenModel.create({ token });
        res.clearCookie('token');
        return res.status(200).json({ message: 'Captain logged out successfully' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports.toggleAvailability = async (req, res, next) => {
    try {
        const captain = await captainModel.findById(req.captain._id);

        captain.status = captain.status === 'active' ? 'inactive' : 'active';
        await captain.save();

        res.status(200).json({ message: 'Status toggled', status: captain.status });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
