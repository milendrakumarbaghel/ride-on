import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mapRoutes from './routes/maps.routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.MAPS_SERVICE_PORT || 4003;
const API_KEY = process.env.GOOGLE_MAP_API_KEY;

app.use('/', mapRoutes);


app.listen(PORT, () => console.log(`maps-service on http://localhost:${PORT}`));
