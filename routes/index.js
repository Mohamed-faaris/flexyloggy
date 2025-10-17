const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Flexyloggy API' });
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.send(JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() }));
});

module.exports = router;
