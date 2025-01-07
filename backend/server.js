// Import dependencies
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const userRoutes = require('./routes/user.routes');

// Initialize the app
const app = express();

// Create server instance
const server = http.createServer(app);

// Use middlewares
app.use(cors());
app.use(express.json()); // Enable JSON parsing for request bodies
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded parsing for request bodies

// Environment variables
const PORT = process.env.PORT || 5000;

// Define routes
app.get('/', (req, res) => {
    res.send('Hi there! Welcome to the server.');
});

app.use('/users', userRoutes);

// Connecting with database
const connectToDatabase = require('./db/database');
connectToDatabase();

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export app for testing or further configuration
module.exports = app;
