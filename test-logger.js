#!/usr/bin/env node

/**
 * Test script to demonstrate the logger functionality
 * Run this after starting the server: node test-logger.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Test-Logger/1.0',
      },
    };

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body),
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body,
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Flexyloggy Logger...\n');

  try {
    // Test 1: POST request
    console.log('1️⃣  Testing POST /test');
    const testResponse = await makeRequest('POST', '/test', {
      username: 'testuser',
      email: 'test@example.com',
      action: 'testing logger',
    });
    console.log(
      `✅ POST /test completed - Status: ${testResponse.status}\n`
    );

    // Test 2: GET home
    console.log('2️⃣  Testing GET / (home)');
    const homeResponse = await makeRequest('GET', '/');
    console.log(`✅ GET / completed - Status: ${homeResponse.status}\n`);

    // Test 3: GET with query params
    console.log('3️⃣  Testing GET /logs?limit=5');
    const logsResponse = await makeRequest('GET', '/logs?limit=5');
    console.log(`✅ GET /logs - Found ${logsResponse.data.total} logs\n`);

    // Test 4: Filter logs by method
    console.log('4️⃣  Testing GET /logs/filter?method=POST');
    const filterResponse = await makeRequest('GET', '/logs/filter?method=POST');
    console.log(
      `✅ GET /logs/filter - Found ${filterResponse.data.total} POST requests\n`
    );

    // Test 5: Get local logs
    console.log('5️⃣  Testing GET /logs/local');
    const localResponse = await makeRequest('GET', '/logs/local');
    console.log(`✅ GET /logs/local - Found ${localResponse.data.total} logs\n`);

    // Test 6: Get statistics
    console.log('6️⃣  Testing GET /logger/stats');
    const statsResponse = await makeRequest('GET', '/logger/stats');
    console.log(
      `✅ GET /logger/stats completed\n`,
      JSON.stringify(statsResponse.data, null, 2)
    );

    console.log('\n✨ All tests completed!');
    console.log(
      '📊 Check the logs/ directory for local JSON logs\n'
    );
    console.log(
      '💾 Check MongoDB for persistent logs\n'
    );
    console.log(
      '📺 Check console output above for [METHOD] URL - IP logs\n'
    );
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error(
      '\n⚠️  Make sure the server is running: node server.js'
    );
  }
}

runTests();
