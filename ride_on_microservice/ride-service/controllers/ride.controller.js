import { validationResult } from 'express-validator';
import { createRide, getFare, confirmRide, startRide, endRide } from '../services/ride.service.js';
import axios from 'axios';

export async function createRideHandler(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        // Fire-and-forget: notify nearby captains
        try {
            const MAPS_URL = process.env.MAPS_SERVICE_URL || 'http://localhost:4003';
            const CAPTAIN_URL = process.env.CAPTAIN_SERVICE_URL || 'http://localhost:4002';
            const RT_URL = process.env.REALTIME_SERVICE_URL || 'http://localhost:4010';
            const { data: coords } = await axios.get(`${MAPS_URL}/geocode`, { params: { address: pickup } });
            const { data: captains } = await axios.get(`${CAPTAIN_URL}/captains-in-radius`, { params: { lat: coords.lat, lng: coords.lng, radiusKm: 2, vehicleType } });
            await Promise.all(
                captains.map((c) => axios.post(`${RT_URL}/emit`, { socketId: c.socketId, event: 'new-ride', data: ride }))
            );
        } catch (notifyErr) {
            console.error('notify captains failed', notifyErr.message);
        }
        return;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getFareHandler(req, res) {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ error: errs.array() });
    const { pickup, destination } = req.query;
    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error while fetching fare' });
    }
}

export async function confirmRideHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
    const { rideId } = req.body;
    try {
        const ride = await confirmRide({ rideId, captain: req.captain });
        res.status(200).json(ride);
        // notify user if socket is known
        try {
            const RT_URL = process.env.REALTIME_SERVICE_URL || 'http://localhost:4010';
            // if you track user->socket elsewhere, you could look it up via realtime-service
            // here we skip lookup and assume client will poll
        } catch { }
        return;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function startRideHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
    const { rideId, otp } = req.query;
    try {
        const ride = await startRide({ rideId, otp, captain: req.captain });
        res.status(200).json(ride);
        // could notify user via realtime here similarly
        return;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function endRideHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
    const { rideId } = req.body;
    try {
        const ride = await endRide({ rideId, captain: req.captain });
        res.status(200).json(ride);
        // could notify user via realtime here similarly
        return;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}
