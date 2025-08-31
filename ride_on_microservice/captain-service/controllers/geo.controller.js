import Captain from '../models/captain.model.js';

export async function getCaptainsInRadius(req, res) {
    try {
        const { lat, lng, radiusKm = 2, vehicleType } = req.query;
        if (lat == null || lng == null) return res.status(400).json({ message: 'lat and lng required' });
        const radius = Number(radiusKm);
        const query = {
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
                    $maxDistance: radius * 1000
                }
            }
        };
        if (vehicleType) query['vehicle.vehicleType'] = vehicleType;
        const captains = await Captain.find(query).limit(50).select('socketId fullName vehicle location');
        return res.json(captains);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'geo query failed' });
    }
}
