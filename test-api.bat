@echo off
REM Logger API Testing Examples - Windows Batch
REM Run these commands to test your logger system

setlocal enabledelayedexpansion

set BASE_URL=http://localhost:3000

echo.
echo =============================================================
echo         Flexyloggy Logger API Testing
echo =============================================================
echo.

echo [1] Home Endpoint
echo -------------------------------------------------------
curl -s %BASE_URL%/ | find "{" >nul
if %ERRORLEVEL% EQU 0 (
    curl -s %BASE_URL%/
) else (
    echo Install 'jq' or use curl directly
    curl -s %BASE_URL%/
)
echo.

echo [2] Create Test Log - POST Request
echo -------------------------------------------------------
curl -s -X POST %BASE_URL%/test ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"action\":\"testing\"}"
echo.

echo [3] Get All Logs from MongoDB
echo -------------------------------------------------------
curl -s "%BASE_URL%/logs"
echo.

echo [4] Get Limited Logs (limit=5)
echo -------------------------------------------------------
curl -s "%BASE_URL%/logs?limit=5"
echo.

echo [5] Get Local Logs (Last 7 Days)
echo -------------------------------------------------------
curl -s "%BASE_URL%/logs/local?days=7"
echo.

echo [6] Filter Logs by Method - POST Requests
echo -------------------------------------------------------
curl -s "%BASE_URL%/logs/filter?method=POST"
echo.

echo [7] Filter Logs by Status Code - 200
echo -------------------------------------------------------
curl -s "%BASE_URL%/logs/filter?statusCode=200"
echo.

echo [8] Filter by Multiple Criteria - GET + 200 status
echo -------------------------------------------------------
curl -s "%BASE_URL%/logs/filter?method=GET&statusCode=200"
echo.

echo [9] Get Request Statistics
echo -------------------------------------------------------
curl -s "%BASE_URL%/logger/stats"
echo.

echo [10] All Available Endpoints
echo -------------------------------------------------------
curl -s "%BASE_URL%/"
echo.

echo =============================================================
echo Testing Complete!
echo =============================================================
echo.
echo Note: For pretty JSON output, install jq:
echo   PowerShell: choco install jq
echo   Or use: curl http://localhost:3000/logs | ConvertFrom-Json | ConvertTo-Json -Depth 3
echo.

pause
