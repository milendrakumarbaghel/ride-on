import jwt from 'jsonwebtoken';
import captainModel from '../models/captain.model.js';
import blackListTokenModel from '../models/blacklistToken.model.js';

export async function authCaptain(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CAPTAIN);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
