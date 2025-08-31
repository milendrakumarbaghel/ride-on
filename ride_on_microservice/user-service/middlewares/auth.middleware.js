import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import blackListTokenModel from '../models/blacklistToken.model.js';

export async function authUser(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
