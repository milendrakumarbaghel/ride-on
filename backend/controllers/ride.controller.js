const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { listIndexes } = require('../models/captain.model');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

// Create a new ride
module.exports.createRide = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        // console.log(pickupCoordinates);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

        ride.otp = ""

        // console.log(captainsInRadius);

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(async captain => {

            // console.log(captain, ride)

            sendMessageToSocketId(
                captain.socketId,
                {
                    event: 'new-ride',
                    data: rideWithUser
                  }
            );
        })
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

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { rideId } = req.body;

    try{
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        console.log(ride)
        return res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        console.log('yha hai error')
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        console.log('Error during starting ride');
        return res.status(500).json({ error: 'Internal server error' });
    }
}
