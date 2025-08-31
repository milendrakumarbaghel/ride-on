import captainModel from '../models/captain.model.js';

export async function createCaptain({ firstName, lastName, email, password, color, plate, capacity, vehicleType }) {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    return captainModel.create({
        fullName: { firstName, lastName },
        email,
        password,
        vehicle: { color, plate, capacity, vehicleType },
    });
}
