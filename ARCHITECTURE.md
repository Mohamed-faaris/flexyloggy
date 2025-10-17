# Logger System Architecture

## Request Flow Diagram

```
┌─────────────┐
│   Client    │ (Browser, API call, etc.)
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────────────────┐
│      Express Server             │
│  (server.js)                    │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│  Logger Middleware (loggerMiddleware.js)                │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 1. Extract request data:                        │   │
│  │    - HTTP Method                               │   │
│  │    - URL & Query Parameters                    │   │
│  │    - Request Body                              │   │
│  │    - Source IP Address                         │   │
│  │    - User Agent                                │   │
│  │    - Start timestamp                           │   │
│  └─────────────────────────────────────────────────┘   │
└──────┬──────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│      Route Handler              │
│    (routes/index.js)            │
│  Processes request & creates    │
│  response                       │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│  Logger Middleware (res.send interception)              │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 2. Extract response data:                       │   │
│  │    - Status Code                               │   │
│  │    - Response Time (elapsed)                   │   │
│  │    - End timestamp                             │   │
│  └─────────────────────────────────────────────────┘   │
└──────┬──────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────┐
│  Logger.log() (utils/loggerUtil.js)        │
│  Creates complete log entry                │
└──────┬────────────────────────────────────┘
       │
       ├─────────────┬──────────────┬─────────────┐
       │             │              │             │
       ▼             ▼              ▼             ▼
    Console      MongoDB      Local JSON      Response
    Output       Storage      Files (logs/)    to Client
    
    [METHOD]    {log obj}     logs/            HTTP 200
    URL - IP    saved to      log-YYYY-MM-DD   Response
               Database       .json
```

## Data Flow Summary

```
REQUEST RECEIVED
    ↓
MIDDLEWARE CAPTURES:
  • Method (GET, POST, etc.)
  • URL & Query Parameters
  • Body Data
  • Source IP
  • User Agent
  ↓
REQUEST PROCESSED BY ROUTE
    ↓
RESPONSE GENERATED
    ↓
MIDDLEWARE CAPTURES:
  • Status Code (200, 404, etc.)
  • Response Time (milliseconds)
    ↓
LOGGER.LOG() CALLED
    ├─────→ [Console] [METHOD] URL - IP
    ├─────→ [MongoDB] Persistent storage (Log collection)
    └─────→ [JSON File] logs/log-YYYY-MM-DD.json
    ↓
RESPONSE SENT TO CLIENT
```

## File Responsibilities

```
┌──────────────────────────────────────────────┐
│  server.js                                   │
│  • Initializes Express app                   │
│  • Connects to MongoDB                       │
│  • Applies middleware globally               │
│  • Sets up routes                            │
└──────────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────────┐
│  middleware/loggerMiddleware.js              │
│  • Intercepts requests & responses           │
│  • Extracts all data                         │
│  • Calls Logger.log()                        │
└──────────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────────┐
│  utils/loggerUtil.js                         │
│  • Saves to MongoDB (Log model)              │
│  • Saves to local JSON files                 │
│  • Retrieves logs (MongoDB & local)          │
│  • Clears old logs                           │
└──────────────────────────────────────────────┘
           ↓ ↓ ↓
      ┌────┼─┼────┐
      │    │ │    │
   [DB] [File] [Console]
```

## Data Storage Locations

```
MONGODB
├── Database: flexyloggy
└── Collection: logs
    ├── Document 1: { method: "GET", url: "/", ... }
    ├── Document 2: { method: "POST", url: "/test", ... }
    └── Document N: { method: "...", url: "...", ... }

LOCAL JSON FILES (logs/ directory)
├── log-2025-10-17.json
│   └── [
│         { method: "GET", url: "/", ... },
│         { method: "POST", url: "/test", ... }
│       ]
├── log-2025-10-16.json
│   └── [ ... ]
└── log-2025-10-15.json
    └── [ ... ]
```

## Endpoints & Their Functions

```
GET /                    → Returns welcome message & endpoint list
GET /logs                → Retrieve MongoDB logs
  ├── /logs?limit=50     → Limit results
  └── /logs?method=POST  → Filter by HTTP method

GET /logs/local          → Retrieve local JSON logs
  └── /logs/local?days=7 → Last N days of logs

GET /logs/filter         → Advanced filtering
  ├── ?method=GET        → Filter by method
  ├── ?statusCode=200    → Filter by status code
  └── ?method=GET&statusCode=200 → Multiple filters

GET /logger/stats        → Aggregated statistics
  ├── Total requests
  ├── Method counts
  ├── Status code counts
  ├── Average response time
  └── Top 10 URLs

DELETE /logger/clear     → Delete old logs
  └── ?days=30           → Older than N days

POST /test               → Test endpoint to create sample logs
```

## Console Output Example

```
[GET] / - ::1
[POST] /test - ::1
[GET] /logs - ::1
[GET] /logs/filter?method=POST - ::1
[GET] /logger/stats - ::1
```

**Format**: `[HTTP_METHOD] FULL_URL - SOURCE_IP_ADDRESS`

## Configuration Points

```
loggerMiddleware.js:
  • What data to capture (query, body, params)
  • How to extract source IP
  • Response time calculation

loggerUtil.js:
  • MongoDB connection & operations
  • Local file naming convention (log-YYYY-MM-DD.json)
  • Log retention policies

.env:
  • MONGODB_URI = connection string
  • PORT = server port
```

---

**Legend:**
- `[DB]` = MongoDB Database
- `[File]` = Local JSON Files
- `[Console]` = Terminal Output
