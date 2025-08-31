import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectToDatabase from './db/db.js';
import captainRoutes from './routes/captain.routes.js';
import rabbitmq from './services/rabbit.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded parsing for request bodies
app.use(morgan('dev'));

const PORT = process.env.CAPTAIN_SERVICE_PORT || 4002;

app.get('/health', (req, res) => res.json({ ok: true, service: 'captain-service' }));
app.use('/', captainRoutes);

await connectToDatabase('captain-service');
rabbitmq.connect().catch((e) => console.warn('RabbitMQ initial connect failed (will retry):', e.message));

app.listen(PORT, () => console.log(`captain-service on http://localhost:${PORT}`));
