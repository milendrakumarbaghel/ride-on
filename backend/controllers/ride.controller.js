const rideService = require('../services/ride.service');
const  { validationResult } = require('express-validator');

// Create a new ride
module.exports.createRide = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id, pickup, destination, vehicleType
        });

        return res.status(201).json(ride);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// get fare for a ride
module.exports.getFare = async (req, res) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.status(400).json({ error: erros.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);

        return res.status(200).json(fare);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error while fatching fare' });
    }
}
