import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectToDatabase from './db/db.js';
import rideRoutes from './routes/ride.routes.js';
import rabbitmq from './services/rabbit.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const PORT = process.env.RIDE_SERVICE_PORT || 4004;

app.get('/health', (req, res) => res.json({ ok: true, service: 'ride-service' }));
app.use('/', rideRoutes);

await connectToDatabase('ride-service');
rabbitmq.connect().catch((e) => console.warn('RabbitMQ initial connect failed (will retry):', e.message));

app.listen(PORT, () => console.log(`ride-service on http://localhost:${PORT}`));
