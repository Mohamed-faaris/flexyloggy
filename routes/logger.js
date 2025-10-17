const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const { appendToLogFile } = require('../utils/loggerUtil');

// Middleware to log all requests
const logRequest = async (req, res, next) => {
  const logEntry = {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date()
  };

  // Save to MongoDB
  try {
    const log = new Log(logEntry);
    await log.save();
  } catch (error) {
    console.error('Error saving log to MongoDB:', error);
  }

  // Save to JSON file
  appendToLogFile(logEntry);

  // Console log
  console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} from ${logEntry.ip}`);

  next();
};

// Route to manually log data for all methods
router.all('/log', async (req, res) => {
  const logEntry = {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date()
  };

  try {
    const log = new Log(logEntry);
    await log.save();

    // Save to JSON file
    appendToLogFile(logEntry);

    // Console log
    console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} from ${logEntry.ip}`);

    res.status(200).json({ logged: true, time: log.timestamp, id: log._id });
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ logged: false, error: 'Failed to log' });
  }
});

// Export the middleware
module.exports = {
  router,
  logRequest
};
