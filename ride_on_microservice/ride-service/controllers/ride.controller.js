import { validationResult } from 'express-validator';
import { createRide, getFare, confirmRide, startRide, endRide } from '../services/ride.service.js';
import axios from 'axios';
import { publishToQueue } from '../services/rabbit.js';

export async function createRideHandler(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        // Fire-and-forget: notify nearby captains
        try {
            const API = process.env.API_GATEWAY_URL || 'http://localhost:4000';
            const RT_URL = process.env.REALTIME_SERVICE_URL || 'http://localhost:4005';

            // Step 1: geocode pickup -> { lat, lng }
            let coords;
            try {
                const resp = await axios.get(`${API}/maps/geocode`, { params: { address: pickup } });
                coords = resp.data;
            } catch (err) {
                const msg = err?.response?.data?.message || err.message;
                throw new Error(`geocode failed: ${msg}`);
            }

            // Step 2: find captains within 2km radius (optionally by vehicleType)
            // let captains = [];
            // try {
            //     const resp = await axios.get(`${API}/captains/captains-in-radius`, {
            //         params: { lat: coords.lat, lng: coords.lng, radiusKm: 2, vehicleType }
            //     });
            //     captains = resp.data || [];
            // } catch (err) {
            //     const msg = err?.response?.data?.message || err.message;
            //     throw new Error(`captains-in-radius failed: ${msg}`);
            // }

            // Publish to per-captain queues so only nearby captains receive the ride
            try {
                // Also publish a generic event so long-polling captains can pick it if nearby
                await publishToQueue('new-ride', JSON.stringify({
                    type: 'new-ride',
                    ride,
                    pickup: { lat: coords.lat, lng: coords.lng },
                }));
            } catch (mqErr) {
                console.error('queue publish failed', mqErr.message);
            }

            // Step 3: best-effort realtime emits (only for captains with a socketId)
            // const online = (captains || []).filter((c) => !!c.socketId);
            // if (online.length) {
            //     const results = await Promise.allSettled(
            //         online.map((c) =>
            //             axios.post(`${RT_URL}/emit`, {
            //                 socketId: c.socketId,
            //                 event: 'new-ride',
            //                 data: ride
            //             })
            //         )
            //     );
            //     const failed = results.filter((r) => r.status === 'rejected');
            //     if (failed.length) {
            //         console.warn(`realtime emits partial failure: ${failed.length}/${results.length} failed`);
            //     }
            // }
        } catch (notifyErr) {
            const detail = notifyErr?.response?.data || notifyErr.message;
            console.error('notify captains failed', detail);
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
