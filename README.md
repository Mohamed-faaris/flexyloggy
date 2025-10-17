# Flexyloggy Logger System

A comprehensive logging system for Express.js that captures all HTTP requests and responses, storing logs in MongoDB and local JSON files.

## Features

✅ **Log All HTTP Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD  
✅ **Capture All Data**: Query parameters, request body, URL parameters  
✅ **MongoDB Storage**: Persistent database storage with filtering capabilities  
✅ **Local JSON Storage**: Daily JSON files for local backup/debugging  
✅ **Console Logging**: Method and source IP displayed in console  
✅ **Response Time Tracking**: Measures request processing time  
✅ **Statistics**: Aggregated metrics on requests  
✅ **Log Management**: Clear old logs easily  

## Project Structure

```
flexyloggy/
├── models/
│   └── Log.js                 # Mongoose schema for logs
├── middleware/
│   └── loggerMiddleware.js    # Express middleware for logging
├── utils/
│   └── loggerUtil.js          # Logger utility functions
├── routes/
│   ├── index.js               # Main routes with logging endpoints
│   └── logger.js              # Logger-specific routes (stats, clear)
├── logs/                       # Local JSON log files (auto-created)
├── server.js                  # Express server with logger integration
├── package.json
├── pnpm-lock.yaml
└── .env                       # Environment variables

```

## Logged Data

Each log entry contains:

```json
{
  "method": "POST",
  "url": "/api/users",
  "sourceIp": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "query": {},
  "body": { "name": "John", "email": "john@example.com" },
  "params": {},
  "statusCode": 200,
  "responseTime": 45,
  "timestamp": "2025-10-17T10:30:45.123Z"
}
```

## API Endpoints

### Get All Logs
```
GET /logs
GET /logs?limit=50
GET /logs?method=POST
```

### Get Local Logs
```
GET /logs/local
GET /logs/local?days=7
```

### Filter Logs
```
GET /logs/filter?method=GET
GET /logs/filter?statusCode=200
GET /logs/filter?method=POST&statusCode=201
```

### Logger Statistics
```
GET /logger/stats
```
Returns:
- Total requests
- Method counts
- Status code counts
- Average response time
- Top 10 URLs

### Clear Old Logs
```
DELETE /logger/clear
DELETE /logger/clear?days=30
```

### Test Endpoint
```
POST /test
Body: { "data": "test" }
```

## Console Output

When a request is logged, you'll see:

```
[POST] /api/users - 192.168.1.1
[GET] /logs - 192.168.1.100
```

Format: `[HTTP_METHOD] URL - SOURCE_IP`

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up `.env` file with your MongoDB URI:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3000
```

3. Start the server:
```bash
node server.js
```

## Local Logs

Local logs are stored in the `logs/` directory with filenames like `log-2025-10-17.json`

Each day gets a new file, and logs are appended to the respective date file.

Example `logs/log-2025-10-17.json`:
```json
[
  {
    "method": "GET",
    "url": "/",
    "sourceIp": "::1",
    "statusCode": 200,
    "responseTime": 5,
    "timestamp": "2025-10-17T10:30:45.123Z",
    "savedAt": "2025-10-17T10:30:45.456Z"
  },
  ...
]
```

## Usage Examples

### Get all POST requests
```bash
curl http://localhost:3000/logs/filter?method=POST
```

### Get logs from last 7 days
```bash
curl http://localhost:3000/logs/local?days=7
```

### Get request statistics
```bash
curl http://localhost:3000/logger/stats
```

### Clear logs older than 60 days
```bash
curl -X DELETE http://localhost:3000/logger/clear?days=60
```

## Notes

- ⚠️ **Keep `.env` file private** - Never commit to git
- 📝 Local logs are auto-rotated daily
- 🔄 MongoDB logs are permanent until manually cleared
- ⏱️ Response time is measured in milliseconds
- 🌐 Source IP detection supports X-Forwarded-For and Cloudflare headers
