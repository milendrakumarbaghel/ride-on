import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/ride_on_micro';
await mongoose.connect(MONGODB_URL);

const userSchema = new mongoose.Schema({
    entityId: { type: String, index: true },
    entityType: { type: String, enum: ['user', 'captain'] },
    socketId: String,
});
const SocketIndex = mongoose.model('SocketIndex', userSchema);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] } });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const PORT = process.env.REALTIME_SERVICE_PORT || 4010;

app.get('/health', (req, res) => res.json({ ok: true, service: 'realtime-service' }));

// REST endpoint to emit to a socketId
app.post('/emit', async (req, res) => {
    try {
        const { socketId, event, data } = req.body || {};
        if (!socketId || typeof socketId !== 'string' || !event || typeof event !== 'string') {
            return res.status(400).json({ message: 'socketId and event required' });
        }
        // Basic payload size guard
        const payload = typeof data === 'object' ? JSON.stringify(data) : String(data || '');
        if (payload.length > 64_000) return res.status(413).json({ message: 'payload too large' });
        io.to(socketId).emit(event, data);
        return res.json({ ok: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'emit failed' });
    }
});

// Optionally lookup entityId -> socketId
app.get('/socket-id', async (req, res) => {
    const { entityId, entityType } = req.query;
    if (!entityId || !entityType) return res.status(400).json({ message: 'entityId and entityType required' });
    const rec = await SocketIndex.findOne({ entityId, entityType });
    if (!rec) return res.status(404).json({ message: 'not found' });
    return res.json({ socketId: rec.socketId });
});

io.on('connection', (socket) => {
    console.log('client connected', socket.id);
    socket.on('join', async (data) => {
        const { userId, userType } = data || {};
        if (!userId || !userType) return;
        await SocketIndex.findOneAndUpdate(
            { entityId: userId, entityType: userType },
            { socketId: socket.id },
            { upsert: true }
        );
    });
    socket.on('disconnect', async () => {
        // Optional: cleanup if desired
    });
});

httpServer.listen(PORT, () => console.log(`realtime-service on http://localhost:${PORT}`));
