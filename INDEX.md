# 📖 Documentation Index

## Welcome to Flexyloggy Logger!

This comprehensive logging system captures, stores, and analyzes all HTTP traffic in your Express.js application.

---

## 📚 Documentation Files

### Getting Started
1. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** ⚡ - START HERE
   - Quick commands and examples
   - Most common tasks
   - Troubleshooting

2. **[README.md](README.md)** - Complete Documentation
   - Features overview
   - Installation instructions
   - API endpoints reference
   - Usage examples

### Understanding the System
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** - System Design
   - Data flow diagrams
   - Component interactions
   - Storage locations
   - File responsibilities

4. **[SETUP.md](SETUP.md)** - Detailed Setup Guide
   - Installation steps
   - Configuration details
   - How everything works
   - Next steps

### Implementation Details
5. **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** - What Was Built
   - Complete summary of all files
   - What works and what doesn't
   - Verification checklist
   - Ready to use!

---

## 🚀 Quick Start (5 minutes)

### Step 1: Start the Server
```bash
cd c:\Faaris\Node\flexyloggy
node server.js
```

### Step 2: In Another Terminal - Run Tests
```powershell
.\test-api.ps1
```

### Step 3: Check the Logs
```bash
curl http://localhost:3000/logs
curl http://localhost:3000/logger/stats
```

---

## 📁 Project Structure

```
flexyloggy/
├── 📄 Documentation (Read These)
│   ├── README.md                 ← Full documentation
│   ├── SETUP.md                  ← Setup guide
│   ├── ARCHITECTURE.md           ← System design
│   ├── QUICK_REFERENCE.md        ← Quick commands
│   ├── IMPLEMENTATION_COMPLETE.md ← What was built
│   └── INDEX.md                  ← This file
│
├── 🔧 Core Application
│   ├── server.js                 ← Express server
│   ├── package.json              ← Dependencies
│   └── .env                      ← Configuration
│
├── 📂 middleware/
│   └── loggerMiddleware.js       ← Request logging
│
├── 📂 models/
│   └── Log.js                    ← MongoDB schema
│
├── 📂 utils/
│   └── loggerUtil.js             ← Logger functions
│
├── 📂 routes/
│   ├── index.js                  ← Main routes
│   └── logger.js                 ← Logger routes
│
├── 🧪 Testing
│   ├── test-logger.js            ← Node.js test script
│   ├── test-api.ps1              ← PowerShell test script
│   ├── test-api.bat              ← Windows batch script
│   └── test-api.sh               ← Bash script
│
└── 📝 logs/                      ← Auto-created daily logs
    ├── log-2025-10-17.json
    └── log-2025-10-16.json
```

---

## 🎯 Common Tasks

### Monitor Live Requests
```bash
node server.js
```
Watch console for: `[METHOD] URL - IP`

### Get All Logs
```bash
curl http://localhost:3000/logs
```

### Filter by HTTP Method
```bash
curl http://localhost:3000/logs/filter?method=POST
```

### Get Statistics
```bash
curl http://localhost:3000/logger/stats
```

### View Local Backups
```bash
curl http://localhost:3000/logs/local?days=7
```

### Clean Up Old Logs
```bash
curl -X DELETE http://localhost:3000/logger/clear?days=30
```

---

## 📊 What Gets Logged

For every HTTP request:
- ✅ HTTP Method (GET, POST, PUT, DELETE, etc.)
- ✅ Full URL with query parameters
- ✅ Request body data
- ✅ Client IP address
- ✅ User agent string
- ✅ Response status code
- ✅ Response time (milliseconds)
- ✅ Timestamp

---

## 💾 Where Logs Are Stored

### MongoDB
- Permanent storage
- Queryable database
- Configured in `.env`

### Local JSON Files
- `logs/` directory
- Daily rotation: `log-YYYY-MM-DD.json`
- Automatic backup

### Console
- Real-time display
- Format: `[METHOD] URL - IP`

---

## 🔗 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Welcome & endpoints list |
| GET | `/logs` | Get all logs |
| GET | `/logs/local` | Get local JSON logs |
| GET | `/logs/filter` | Filter logs |
| GET | `/logger/stats` | Get statistics |
| DELETE | `/logger/clear` | Delete old logs |
| POST | `/test` | Create test logs |

---

## 📖 Reading Guide

### If you want to...

**Get started immediately:**
→ Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

**Understand how everything works:**
→ Read [ARCHITECTURE.md](ARCHITECTURE.md)

**Follow detailed setup steps:**
→ Read [SETUP.md](SETUP.md)

**See all API endpoints:**
→ Read [README.md](README.md)

**Know what was implemented:**
→ Read [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)

---

## 🧪 Testing

### Automated Test (Recommended)
```powershell
# PowerShell (Windows)
.\test-api.ps1
```

```bash
# Node.js (Any OS)
node test-logger.js
```

```bash
# Bash (Linux/Mac)
./test-api.sh
```

```cmd
# Batch (Windows)
test-api.bat
```

---

## ✨ Features

✅ **All HTTP Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
✅ **Complete Data Capture**: Method, URL, body, IP, user agent, status code
✅ **MongoDB Storage**: Permanent persistent database
✅ **Local JSON Backup**: Daily rotating files
✅ **Real-time Console**: Live request monitoring
✅ **Response Tracking**: Time measurement and status codes
✅ **Advanced Filtering**: By method, status code, URL
✅ **Statistics**: Request counts, averages, top URLs
✅ **Log Management**: Automatic cleanup by age
✅ **Production Ready**: Error handling, async operations

---

## 🔧 Configuration

### `.env` File
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flexyloggy
PORT=3000
```

### Customize By Editing
- `middleware/loggerMiddleware.js` - What to capture
- `utils/loggerUtil.js` - How to store & retrieve
- `.env` - Connection strings

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Server won't start | Check MONGODB_URI in .env |
| No logs in MongoDB | Verify connection: "MongoDB connected successfully" |
| No local logs | Logs/ created automatically, check permissions |
| No console output | Verify middleware in server.js line 13 |
| Port already in use | Change PORT in .env or kill process |

---

## 📞 Quick Help

**Q: How do I start?**  
A: Run `node server.js` then `.\test-api.ps1`

**Q: Where are my logs?**  
A: MongoDB (permanent) and `logs/` directory (daily)

**Q: How do I query logs?**  
A: Use `/logs`, `/logs/filter`, `/logs/local` endpoints

**Q: Can I delete old logs?**  
A: Yes, use `DELETE /logger/clear?days=30`

**Q: How do I filter logs?**  
A: Use `/logs/filter?method=POST&statusCode=200`

---

## 🎓 Learning Path

1. Start with [QUICK_REFERENCE.md](QUICK_REFERENCE.md) (5 min)
2. Follow [SETUP.md](SETUP.md) (10 min)
3. Run tests with `.\test-api.ps1` (5 min)
4. Read [ARCHITECTURE.md](ARCHITECTURE.md) for deep understanding (15 min)
5. Refer to [README.md](README.md) for complete API (as needed)

---

## ✅ Verification

- ✅ All files created
- ✅ All dependencies installed
- ✅ All syntax verified
- ✅ MongoDB schema ready
- ✅ Middleware configured
- ✅ Routes set up
- ✅ Documentation complete
- ✅ Tests available
- ✅ Production ready

---

## 🚀 Next Steps

1. **Start Server**
   ```bash
   node server.js
   ```

2. **Run Tests**
   ```powershell
   .\test-api.ps1
   ```

3. **Query Logs**
   ```bash
   curl http://localhost:3000/logs
   ```

4. **View Statistics**
   ```bash
   curl http://localhost:3000/logger/stats
   ```

---

## 📚 File Guide

| File | Size | Type | Purpose |
|------|------|------|---------|
| server.js | Small | Core | Express app setup |
| middleware/loggerMiddleware.js | Small | Core | Request interception |
| utils/loggerUtil.js | Medium | Core | Logger functions |
| models/Log.js | Small | Core | Database schema |
| routes/index.js | Medium | Core | API endpoints |
| routes/logger.js | Small | Core | Stats & cleanup |
| test-logger.js | Medium | Test | Node.js testing |
| test-api.ps1 | Medium | Test | PowerShell testing |
| README.md | Large | Doc | Full documentation |
| ARCHITECTURE.md | Medium | Doc | System design |
| QUICK_REFERENCE.md | Medium | Doc | Quick commands |

---

## 🎉 Ready to Go!

Your logging system is **fully implemented and ready to use**.

**Get started now:**
```bash
node server.js
```

**Questions?** Check the appropriate documentation file above.

---

**Status**: ✅ Complete  
**Version**: 1.0.0  
**Created**: October 17, 2025  
**All Systems**: OPERATIONAL 🚀
