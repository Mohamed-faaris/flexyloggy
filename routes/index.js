const express = require('express');
const router = express.Router();
const Logger = require('../utils/loggerUtil');
const loggerRoutes = require('./logger');

// GET /logs - Retrieve all logs from MongoDB
router.get('/logs', async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const method = req.query.method;
    const filters = method ? { method } : {};

    const logs = await Logger.getLogs(filters);
    res.json({
      total: logs.length,
      logs: logs.slice(0, limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /logs/local - Retrieve logs from local JSON files
router.get('/logs/local', (req, res) => {
  try {
    const daysBack = req.query.days || 1;
    const logs = Logger.getLocalLogs(daysBack);
    res.json({
      total: logs.length,
      logs: logs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /logs/filter - Filter logs by method or status code
router.get('/logs/filter', async (req, res) => {
  try {
    const { method, statusCode } = req.query;
    const filters = {};

    if (method) filters.method = method.toUpperCase();
    if (statusCode) filters.statusCode = parseInt(statusCode);

    const logs = await Logger.getLogs(filters);
    res.json({
      total: logs.length,
      filters: filters,
      logs: logs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /test - Test endpoint to create logs
router.post('/test', (req, res) => {
  res.json({
    message: 'Test endpoint',
    receivedData: req.body,
  });
});

// Logger sub-routes
router.use('/logger', loggerRoutes);

// GET / - Home endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Flexyloggy Logger',
    endpoints: {
      logs: '/logs - Get all logs from MongoDB',
      logsLocal: '/logs/local?days=N - Get logs from local JSON files',
      logsFilter: '/logs/filter?method=GET&statusCode=200 - Filter logs by method or status code',
      loggerStats: '/logger/stats - Get statistics from logs',
      loggerClear: 'DELETE /logger/clear?days=30 - Clear old logs',
      test: 'POST /test - Test endpoint',
    },
  });
});

module.exports = router;
