const jwt = require('jsonwebtoken');
const axios = require('axios');


module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

        const response = await axios.get(`${process.env.USER_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = response.data;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;

        next();

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.captainAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CAPTAIN);

        const response = await axios.get(`${process.env.CAPTAIN_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const captain = response.data;

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.captain = captain;

        next();

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
