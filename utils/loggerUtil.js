const fs = require('fs');
const path = require('path');
const Log = require('../models/Log');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

class Logger {
  /**
   * Log request/response to both MongoDB and JSON file
   */
  static async log(logData) {
    try {
      // Console log with method and source
      console.log(`[${logData.method}] ${logData.url} - ${logData.sourceIp}`);

      // Save to MongoDB
      const mongoLog = new Log(logData);
      await mongoLog.save();

      // Save to JSON file locally
      const timestamp = new Date().toISOString().split('T')[0];
      const logFileName = `log-${timestamp}.json`;
      const logFilePath = path.join(logsDir, logFileName);

      let logs = [];
      if (fs.existsSync(logFilePath)) {
        const fileContent = fs.readFileSync(logFilePath, 'utf-8');
        logs = JSON.parse(fileContent);
      }

      logs.push({
        ...logData,
        savedAt: new Date().toISOString(),
      });

      fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), 'utf-8');

      return mongoLog;
    } catch (error) {
      console.error('Logger Error:', error.message);
    }
  }

  /**
   * Get logs from MongoDB with optional filters
   */
  static async getLogs(filters = {}) {
    try {
      return await Log.find(filters).sort({ timestamp: -1 });
    } catch (error) {
      console.error('Error retrieving logs:', error.message);
      throw error;
    }
  }

  /**
   * Get logs from local JSON file
   */
  static getLocalLogs(daysBack = 1) {
    try {
      const logs = [];
      for (let i = 0; i < daysBack; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const logFileName = `log-${dateStr}.json`;
        const logFilePath = path.join(logsDir, logFileName);

        if (fs.existsSync(logFilePath)) {
          const fileContent = fs.readFileSync(logFilePath, 'utf-8');
          logs.push(...JSON.parse(fileContent));
        }
      }
      return logs;
    } catch (error) {
      console.error('Error reading local logs:', error.message);
      return [];
    }
  }

  /**
   * Clear old logs (older than specified days)
   */
  static async clearOldLogs(daysOld = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);
      await Log.deleteMany({ timestamp: { $lt: cutoffDate } });
      console.log(`Cleared logs older than ${daysOld} days from MongoDB`);
    } catch (error) {
      console.error('Error clearing old logs:', error.message);
    }
  }
}

module.exports = Logger;
