const Logger = require('../utils/loggerUtil');

/**
 * Express middleware to log all requests
 * Logs method, URL, data sent, and response information
 */
function loggerMiddleware(req, res, next) {
  // Capture start time for response time calculation
  const startTime = Date.now();

  // Extract client IP
  const sourceIp =
    req.headers['x-forwarded-for'] ||
    req.headers['cf-connecting-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.ip ||
    'Unknown';

  // Intercept res.send to capture status code and response time
  const originalSend = res.send;
  res.send = function (data) {
    const responseTime = Date.now() - startTime;
    const statusCode = res.statusCode;

    // Create log object
    const logData = {
      method: req.method,
      url: req.originalUrl,
      sourceIp: sourceIp,
      userAgent: req.get('user-agent') || 'Unknown',
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
      body:
        Object.keys(req.body).length > 0
          ? JSON.stringify(req.body)
          : undefined,
      params: Object.keys(req.params).length > 0 ? req.params : undefined,
      statusCode: statusCode,
      responseTime: responseTime,
      timestamp: new Date(),
    };

    // Log asynchronously (don't block request)
    Logger.log(logData).catch((err) =>
      console.error('Logging error:', err.message)
    );

    // Call original send
    return originalSend.call(this, data);
  };

  next();
}

module.exports = loggerMiddleware;
