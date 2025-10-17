// This file is reserved for additional logger-related routes
// Currently, logger routes are in index.js
// You can expand logger-specific functionality here if needed

const express = require('express');
const router = express.Router();
const Logger = require('../utils/loggerUtil');

// GET /logger/stats - Get statistics from logs
router.get('/stats', async (req, res) => {
  try {
    const logs = await Logger.getLogs();

    const stats = {
      totalRequests: logs.length,
      methodCounts: {},
      statusCodeCounts: {},
      averageResponseTime: 0,
      topUrls: {},
    };

    let totalResponseTime = 0;

    logs.forEach((log) => {
      // Count methods
      stats.methodCounts[log.method] =
        (stats.methodCounts[log.method] || 0) + 1;

      // Count status codes
      stats.statusCodeCounts[log.statusCode] =
        (stats.statusCodeCounts[log.statusCode] || 0) + 1;

      // Calculate total response time
      totalResponseTime += log.responseTime || 0;

      // Count top URLs
      stats.topUrls[log.url] = (stats.topUrls[log.url] || 0) + 1;
    });

    stats.averageResponseTime =
      logs.length > 0 ? Math.round(totalResponseTime / logs.length) : 0;

    // Get top 10 URLs
    stats.topUrls = Object.entries(stats.topUrls)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj;
      }, {});

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /logger/clear - Clear old logs
router.delete('/clear', async (req, res) => {
  try {
    const daysOld = req.query.days || 30;
    await Logger.clearOldLogs(daysOld);
    res.json({
      message: `Logs older than ${daysOld} days have been cleared`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
