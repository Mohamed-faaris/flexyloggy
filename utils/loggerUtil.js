const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'logs.json');

function ensureLogFile() {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([], null, 2));
  }
}

function appendToLogFile(logEntry) {
  ensureLogFile();
  const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  logs.push(logEntry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

module.exports = {
  appendToLogFile
};
