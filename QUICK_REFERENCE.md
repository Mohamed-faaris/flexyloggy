# ⚡ Quick Reference Guide

## 🚀 Quick Start (3 Steps)

### 1. Start Server
```bash
cd c:\Faaris\Node\flexyloggy
node server.js
```

### 2. In Another Terminal - Run Tests
```bash
node test-logger.js
```

### 3. Check Logs
```bash
# View logs in console ↑
# Check local JSON files
ls logs/

# Or query via API
curl http://localhost:3000/logs
curl http://localhost:3000/logs/local
curl http://localhost:3000/logger/stats
```

---

## 📊 Most Used API Calls

### Get All Logs
```bash
curl http://localhost:3000/logs
```

### Get Last 50 Logs
```bash
curl http://localhost:3000/logs?limit=50
```

### Get Only POST Requests
```bash
curl http://localhost:3000/logs/filter?method=POST
```

### Get Statistics
```bash
curl http://localhost:3000/logger/stats
```

### Get Local Logs (Last 7 Days)
```bash
curl http://localhost:3000/logs/local?days=7
```

### Delete Logs Older Than 60 Days
```bash
curl -X DELETE http://localhost:3000/logger/clear?days=60
```

---

## 📁 File Locations

| What | Where |
|------|-------|
| Server code | `server.js` |
| Logger middleware | `middleware/loggerMiddleware.js` |
| Logger utilities | `utils/loggerUtil.js` |
| MongoDB schema | `models/Log.js` |
| API routes | `routes/index.js` |
| Logger routes | `routes/logger.js` |
| Local logs | `logs/log-YYYY-MM-DD.json` |
| MongoDB connection | `.env` (MONGODB_URI) |

---

## 📝 Environment Setup

### `.env` File Contents
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flexyloggy
PORT=3000
```

---

## 🔍 What Gets Logged

For every HTTP request:
✅ HTTP Method (GET, POST, PUT, DELETE, etc.)  
✅ Full URL with query parameters  
✅ Request body data  
✅ Client IP address  
✅ User agent  
✅ Response status code  
✅ Response time (milliseconds)  
✅ Timestamp  

---

## 💾 Where Logs Are Stored

### MongoDB
- **Database**: flexyloggy
- **Collection**: logs
- **Permanent** until deleted
- **Queryable** via `/logs` endpoints

### Local JSON
- **Directory**: `logs/`
- **Files**: `log-2025-10-17.json`, `log-2025-10-16.json`, etc.
- **One file per day**
- **Auto-created**

### Console
- **Output**: `[METHOD] URL - IP`
- **Real-time** display

---

## 🎯 Common Tasks

### Task: Monitor All Requests
```bash
node server.js
# Watch console for [METHOD] URL - IP output
```

### Task: Get All GET Requests
```bash
curl http://localhost:3000/logs/filter?method=GET
```

### Task: Find Failed Requests (5xx)
```bash
curl http://localhost:3000/logs/filter?statusCode=500
```

### Task: Get Request Statistics
```bash
curl http://localhost:3000/logger/stats
```

### Task: See Daily Backup Logs
```bash
curl http://localhost:3000/logs/local
```

### Task: Clean Up Old Logs
```bash
# Delete logs older than 30 days
curl -X DELETE http://localhost:3000/logger/clear?days=30
```

---

## 🧪 Testing

### Run All Tests
```bash
node test-logger.js
```

Tests included:
1. POST request logging
2. GET home endpoint
3. Retrieve logs from MongoDB
4. Filter logs by method
5. Retrieve local logs
6. Get statistics

---

## 🔧 Customize Logger

### To capture additional data:
Edit `middleware/loggerMiddleware.js` and add fields to `logData` object

### To change log retention:
Edit `utils/loggerUtil.js` in `clearOldLogs()` function

### To change file naming:
Edit `utils/loggerUtil.js` in `log()` function (logFileName variable)

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "MongoDB connection error" | Check MONGODB_URI in .env |
| "logs directory not found" | Create manually or restart server |
| "Cannot find module" | Run `pnpm install` |
| "Port already in use" | Change PORT in .env or kill process |
| "No logs appearing" | Ensure middleware is in server.js |

---

## 📚 Documentation Files

- **README.md** - Full documentation
- **SETUP.md** - Detailed setup instructions
- **ARCHITECTURE.md** - System design & flow
- **QUICK_REFERENCE.md** - This file

---

## 🎓 Understanding the Flow

```
1. Request arrives
        ↓
2. Logger middleware captures data
        ↓
3. Route handler processes request
        ↓
4. Response generated
        ↓
5. Logger middleware captures response data
        ↓
6. Data saved to:
   ├─ Console
   ├─ MongoDB
   └─ Local JSON
        ↓
7. Response sent to client
```

---

## ✨ Key Commands

```bash
# Start server
node server.js

# Run tests
node test-logger.js

# Check syntax
node -c server.js

# View local logs
cat logs/log-2025-10-17.json

# Count log files
ls -1 logs/ | wc -l
```

---

## 📞 Quick Help

**Q: How do I see logs in real-time?**  
A: Run `node server.js` and watch the console for `[METHOD] URL - IP` output

**Q: Where are my logs stored?**  
A: Both MongoDB and `logs/` directory

**Q: How do I query logs?**  
A: Use `/logs`, `/logs/filter`, `/logs/local`, or `/logger/stats` endpoints

**Q: How do I delete old logs?**  
A: `curl -X DELETE http://localhost:3000/logger/clear?days=30`

**Q: Can I filter logs?**  
A: Yes! Use `/logs/filter?method=GET&statusCode=200`

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: October 17, 2025
