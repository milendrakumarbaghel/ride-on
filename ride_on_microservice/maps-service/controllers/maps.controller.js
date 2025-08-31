import axios from 'axios';

const API_KEY = process.env.GOOGLE_MAP_API_KEY;

export async function health(req, res) {
    return res.json({ ok: true, service: 'maps-service' });
}

export async function geocode(req, res) {
    try {
        const { address } = req.query;
        if (!address) return res.status(400).json({ message: 'address is required' });
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return res.json({ lat: location.lat, lng: location.lng });
        }
        return res.status(400).json({ message: 'Unable to fetch coordinates' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'maps error' });
    }
}

export async function distance(req, res) {
    try {
        const { origin, destination } = req.query;
        if (!origin || !destination) return res.status(400).json({ message: 'origin and destination required' });
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const el = response.data.rows[0].elements[0];
            if (el.status === 'ZERO_RESULTS') return res.status(404).json({ message: 'No routes found' });
            return res.json(el);
        }
        return res.status(400).json({ message: 'Unable to fetch distance and time' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'maps error' });
    }
}

export async function autocomplete(req, res) {
    try {
        const { input } = req.query;
        if (!input) return res.status(400).json({ message: 'input required' });
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${API_KEY}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK') return res.json(response.data.predictions);
        return res.status(400).json({ message: 'Unable to fetch suggestions' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'maps error' });
    }
}
