// Import dependencies
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
const { initializeSocket } = require('./socket');

// Initialize the app
const app = express();
const cookieParser = require('cookie-parser');

// Create server instance
const server = http.createServer(app);

// Use middlewares
app.use(cors());
app.use(express.json()); // Enable JSON parsing for request bodies
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded parsing for request bodies
app.use(cookieParser());

// Environment variables
const PORT = process.env.PORT || 5000;

// Define routes
app.get('/', (req, res) => {
    res.send('Hi there! Welcome to the server.');
});

// Use routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

// Connecting with database
const connectToDatabase = require('./db/database');
connectToDatabase();

initializeSocket(server);
//CI/CD Check 11
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export app for testing or further configuration
module.exports = app;
