# Logger API Testing Examples - PowerShell
# Run this script to test your logger system
# Usage: .\test-api.ps1

Write-Host "`n=========================================================" -ForegroundColor Cyan
Write-Host "     Flexyloggy Logger API Testing - PowerShell" -ForegroundColor Cyan
Write-Host "=========================================================`n" -ForegroundColor Cyan

$BASE_URL = "http://localhost:3000"

# Function to make pretty output
function Show-Response {
    param(
        [string]$Title,
        [string]$Endpoint,
        [string]$Method = "GET",
        [hashtable]$Body = $null
    )
    
    Write-Host "[*] $Title" -ForegroundColor Green
    Write-Host "    Endpoint: $Endpoint" -ForegroundColor Gray
    
    try {
        if ($Method -eq "GET") {
            $response = Invoke-RestMethod -Uri $Endpoint -Method Get
        } else {
            $response = Invoke-RestMethod -Uri $Endpoint -Method Post -Body ($Body | ConvertTo-Json) -ContentType "application/json"
        }
        
        # Display response
        $response | ConvertTo-Json -Depth 2 | Out-String | Write-Host -ForegroundColor White
    } catch {
        Write-Host "❌ Error: $_" -ForegroundColor Red
    }
    
    Write-Host ""
}

# Test 1: Home Endpoint
Show-Response -Title "1. Home Endpoint & Available Endpoints" -Endpoint "$BASE_URL/"

# Test 2: Create Test Log (POST)
$testData = @{
    username = "testuser"
    email    = "test@example.com"
    action   = "testing logger"
}
Show-Response -Title "2. Create Test Log (POST Request)" -Endpoint "$BASE_URL/test" -Method "POST" -Body $testData

# Test 3: Get All Logs
Show-Response -Title "3. Get All Logs from MongoDB" -Endpoint "$BASE_URL/logs"

# Test 4: Get Limited Logs
Show-Response -Title "4. Get Limited Logs (limit=5)" -Endpoint "$BASE_URL/logs?limit=5"

# Test 5: Get Local Logs
Show-Response -Title "5. Get Logs from Local JSON (Last 7 Days)" -Endpoint "$BASE_URL/logs/local?days=7"

# Test 6: Filter by Method
Show-Response -Title "6. Filter Logs by Method - POST Requests" -Endpoint "$BASE_URL/logs/filter?method=POST"

# Test 7: Filter by Status Code
Show-Response -Title "7. Filter Logs by Status Code - 200" -Endpoint "$BASE_URL/logs/filter?statusCode=200"

# Test 8: Filter by Multiple Criteria
Show-Response -Title "8. Filter by Multiple Criteria (GET + 200)" -Endpoint "$BASE_URL/logs/filter?method=GET&statusCode=200"

# Test 9: Get Statistics
Show-Response -Title "9. Get Request Statistics" -Endpoint "$BASE_URL/logger/stats"

# Summary
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "✅ Testing Complete!" -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Check console for [METHOD] URL - IP logs" -ForegroundColor Gray
Write-Host "  2. View local logs: Get-Content logs/log-2025-10-17.json" -ForegroundColor Gray
Write-Host "  3. Query MongoDB: curl http://localhost:3000/logs" -ForegroundColor Gray
Write-Host "  4. Get stats: curl http://localhost:3000/logger/stats" -ForegroundColor Gray
Write-Host ""

# Prompt user
Read-Host "Press Enter to exit"
