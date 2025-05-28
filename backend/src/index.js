require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const footballRoutes = require('./routes/footballRoutes');
const testRoutes = require('./routes/testRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json({limit: '2mb'}));  // Increase limit for large JSON payloads
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/football', footballRoutes);
app.use('/api/test', testRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});