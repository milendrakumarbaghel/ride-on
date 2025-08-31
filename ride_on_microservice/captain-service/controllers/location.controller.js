import Captain from '../models/captain.model.js';

export async function updateLocation(req, res) {
    try {
        const { lat, lng } = req.body;
        if (lat == null || lng == null) return res.status(400).json({ message: 'lat and lng required' });
        const latNum = Number(lat);
        const lon = Number(lng);
        if (!Number.isFinite(latNum) || !Number.isFinite(lon)) return res.status(400).json({ message: 'lat and lng must be numbers' });
        await Captain.findByIdAndUpdate(req.captain._id, {
            location: { type: 'Point', coordinates: [lon, latNum] }
        }, { new: true });
        return res.json({ ok: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'update failed' });
    }
}
