require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const indexRouter = require('./routes/index');
const { router: loggerRouter } = require('./routes/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use logger middleware for all routes
app.use(loggerMiddleware);

// Routes
app.use('/', indexRouter);
app.use('/', loggerRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});