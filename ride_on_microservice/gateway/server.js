import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded parsing for request bodies
app.use(morgan('dev'));

const PORT = process.env.GATEWAY_PORT || 4000;

// Health
app.get('/health', (req, res) => res.json({ ok: true, service: 'gateway' }));

// Upstream service URLs
const USER_URL = process.env.USER_SERVICE_URL || 'http://localhost:4001';
const CAPTAIN_URL = process.env.CAPTAIN_SERVICE_URL || 'http://localhost:4002';
const MAPS_URL = process.env.MAPS_SERVICE_URL || 'http://localhost:4003';
const RIDE_URL = process.env.RIDE_SERVICE_URL || 'http://localhost:4004';

console.log('Gateway upstreams:', { USER_URL, CAPTAIN_URL, MAPS_URL, RIDE_URL });

// Simple proxy routing
app.use('/users', proxy(USER_URL));
app.use('/captains', proxy(CAPTAIN_URL));
app.use('/maps', proxy(MAPS_URL));
app.use('/rides', proxy(RIDE_URL));

app.get('/', (req, res) => res.send('Ride On Micro - Gateway'));

app.listen(PORT, () => {
    console.log(`Gateway running on http://localhost:${PORT}`);
});
