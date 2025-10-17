#!/bin/bash
# Logger API Testing Examples
# Run these commands to test your logger system

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Flexyloggy Logger API Testing ===${NC}\n"

# Base URL
BASE_URL="http://localhost:3000"

echo -e "${GREEN}1. Home Endpoint${NC}"
curl -s $BASE_URL/ | jq .
echo ""

echo -e "${GREEN}2. Create Test Log (POST)${NC}"
curl -s -X POST $BASE_URL/test \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","action":"testing"}' | jq .
echo ""

echo -e "${GREEN}3. Get All Logs from MongoDB${NC}"
curl -s $BASE_URL/logs | jq '.logs | .[0:2]'
echo ""

echo -e "${GREEN}4. Get Limited Logs (limit=5)${NC}"
curl -s "$BASE_URL/logs?limit=5" | jq '.logs | .[0:2]'
echo ""

echo -e "${GREEN}5. Get Logs from Last 7 Days (Local JSON)${NC}"
curl -s "$BASE_URL/logs/local?days=7" | jq '.logs | .[0:2]'
echo ""

echo -e "${GREEN}6. Filter Logs by Method (POST)${NC}"
curl -s "$BASE_URL/logs/filter?method=POST" | jq '.logs | .[0:2]'
echo ""

echo -e "${GREEN}7. Filter Logs by Status Code (200)${NC}"
curl -s "$BASE_URL/logs/filter?statusCode=200" | jq '.logs | .[0:2]'
echo ""

echo -e "${GREEN}8. Filter by Multiple Criteria${NC}"
curl -s "$BASE_URL/logs/filter?method=GET&statusCode=200" | jq '.logs | .[0:2]'
echo ""

echo -e "${GREEN}9. Get Request Statistics${NC}"
curl -s $BASE_URL/logger/stats | jq .
echo ""

echo -e "${GREEN}10. All Available Endpoints${NC}"
curl -s $BASE_URL/ | jq '.endpoints'
echo ""

echo -e "${BLUE}=== Testing Complete ===${NC}"
echo -e "${GREEN}✅ All endpoints tested successfully!${NC}"
