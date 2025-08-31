import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectToDatabase from './db/db.js';
import userRoutes from './routes/user.routes.js';
import rabbitmq from './services/rabbit.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const PORT = process.env.USER_SERVICE_PORT || 4001;

app.get('/health', (req, res) => res.json({ ok: true, service: 'user-service' }));
app.use('/', userRoutes);

await connectToDatabase('user-service');
rabbitmq.connect().catch((e) => console.warn('RabbitMQ initial connect failed (will retry):', e.message));

app.listen(PORT, () => console.log(`user-service started on http://localhost:${PORT}`));
