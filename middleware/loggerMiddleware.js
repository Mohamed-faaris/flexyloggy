const Log = require('../models/Log');
const { appendToLogFile } = require('../utils/loggerUtil');

const loggerMiddleware = (req, res, next) => {
  const logEntry = {
    method: req.method,
    url: req.url,
    body: req.body || {},
    headers: req.headers,
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date()
  };

  // Log request
  console.log(`[${logEntry.timestamp}] REQUEST: ${logEntry.method} ${logEntry.url} from ${logEntry.ip}`);

  // Save to MongoDB
  const log = new Log(logEntry);
  log.save().catch(error => console.error('Error saving log to MongoDB:', error));

  // Save to JSON file
  appendToLogFile(logEntry);

  // Override res.send to log response
  const originalSend = res.send;
  res.send = function(data) {
    // Log response
    console.log(`[${new Date()}] RESPONSE: ${res.statusCode} for ${req.method} ${req.url}`);

    // If data is an object, log it, else skip
    if (typeof data === 'object' && data !== null) {
      console.log('Response data:', JSON.stringify(data));
    }

    originalSend.call(this, data);
  };

  next();
};

module.exports = loggerMiddleware;