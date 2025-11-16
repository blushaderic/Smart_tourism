const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const groupRoutes = require('./routes/groupRoutes');

// Import middleware
const errorMiddleware = require('./middleware/errorMiddleware');

// Database connection
const db = require('./config/db');
db.connect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/groups', groupRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(errorMiddleware);

// Socket.io setup
const server = require('http').createServer(app);
const socket = require('./socket');
socket.init(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

