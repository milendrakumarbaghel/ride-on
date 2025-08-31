import axios from 'axios';
import crypto from 'crypto';
import rideModel from '../models/ride.model.js';

const MAPS_URL = process.env.MAPS_SERVICE_URL || 'http://localhost:4003';

function getOtp(num) {
    return crypto.randomInt(10 ** (num - 1), 10 ** num).toString();
}

export async function getFare(pickup, destination) {
    if (!pickup || !destination) throw new Error('Pickup and destination are required');
    const { data: distanceTime } = await axios.get(`${MAPS_URL}/distance`, { params: { origin: pickup, destination } });

    const baseFare = { auto: 30, car: 50, motorcycle: 20 };
    const perKmRate = { auto: 10, car: 15, motorcycle: 8 };
    const perMinuteRate = { auto: 2, car: 3, motorcycle: 1.5 };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };
    return fare;
}

export async function createRide({ user, pickup, destination, vehicleType }) {
    if (!user || !pickup || !destination || !vehicleType) throw new Error('User, pickup, destination and vehicle type are required');
    const fare = await getFare(pickup, destination);
    return rideModel.create({ user, pickup, destination, otp: getOtp(6), fare: fare[vehicleType] });
}

export async function confirmRide({ rideId, captain }) {
    if (!rideId) throw new Error('Ride id is required');
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'accepted', captain: captain._id });
    const ride = await rideModel.findOne({ _id: rideId });
    if (!ride) throw new Error('Ride not found');
    return ride;
}

export async function startRide({ rideId, otp, captain }) {
    if (!rideId || !otp) throw new Error('Ride id and otp are required');
    const ride = await rideModel.findOne({ _id: rideId }).select('+otp');
    if (!ride) throw new Error('Ride not found');
    if (ride.otp !== otp) throw new Error('Invalid OTP');
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' });
    return ride;
}

export async function endRide({ rideId, captain }) {
    if (!rideId) throw new Error('Ride id is required');
    const ride = await rideModel.findOne({ _id: rideId, captain: captain._id });
    if (!ride) throw new Error('Ride not found');
    if (ride.status !== 'ongoing') throw new Error('Ride is not ongoing');
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'completed' });
    return ride;
}
