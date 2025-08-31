import axios from 'axios';

export async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const base = process.env.USER_SERVICE_URL || 'http://localhost:4001';
        const response = await axios.get(`${base}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const user = response.data;
        if (!user) return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        return next();
    } catch (err) {
        const code = err?.response?.status === 401 ? 401 : 500;
        return res.status(code).json({ message: code === 401 ? 'Unauthorized' : 'Auth service error' });
    }
}

export async function authCaptain(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const base = process.env.CAPTAIN_SERVICE_URL || 'http://localhost:4002';
        const response = await axios.get(`${base}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const captain = response.data?.captain || response.data; // captain-service returns { captain }
        if (!captain) return res.status(401).json({ message: 'Unauthorized' });
        req.captain = captain;
        return next();
    } catch (err) {
        const code = err?.response?.status === 401 ? 401 : 500;
        return res.status(code).json({ message: code === 401 ? 'Unauthorized' : 'Auth service error' });
    }
}
