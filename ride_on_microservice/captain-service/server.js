import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectToDatabase } from './db.js';
import captainRoutes from './routes/captain.routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const PORT = process.env.CAPTAIN_SERVICE_PORT || 4002;

app.get('/health', (req, res) => res.json({ ok: true, service: 'captain-service' }));
app.use('/', captainRoutes);

await connectToDatabase('captain-service');

app.listen(PORT, () => console.log(`captain-service on http://localhost:${PORT}`));
