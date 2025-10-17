const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  },
  url: {
    type: String,
    required: true,
  },
  sourceIp: String,
  userAgent: String,
  query: mongoose.Schema.Types.Mixed,
  body: mongoose.Schema.Types.Mixed,
  params: mongoose.Schema.Types.Mixed,
  statusCode: Number,
  responseTime: Number, // in milliseconds
  timestamp: {
    type: Date,
    default: Date.now,
  },
  error: String,
});

module.exports = mongoose.model('Log', logSchema);
