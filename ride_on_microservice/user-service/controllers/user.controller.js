import userModel from '../models/user.model.js';
import { createUser } from '../services/user.service.js';
import { validationResult } from 'express-validator';
import blackListTokenModel from '../models/blacklistToken.model.js';

export async function registerUser(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { fullName, email, password } = req.body;
        const exists = await userModel.findOne({ email });
        if (exists) return res.status(400).json({ message: 'User already exist' });

        const hashedPassword = await userModel.hashPassword(password);
        const user = await createUser({ firstName: fullName.firstName, lastName: fullName.lastName, email, password: hashedPassword });
        const token = user.generateAuthToken();
        return res.status(201).json({ token, user, message: 'User created successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
        const token = user.generateAuthToken();
        res.cookie('token', token);
        return res.status(200).json({ token, user });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function getUserProfile(req, res) {
    return res.status(200).json(req.user);
}

export async function logoutUser(req, res) {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (token) await blackListTokenModel.create({ token });
    return res.status(200).json({ message: 'Logged out successfully' });
}
