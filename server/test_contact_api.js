const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

function test(data, description) {
  console.log(`\nTesting: ${description}`);
  const req = http.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => { responseBody += chunk; });
    res.on('end', () => {
      console.log('Status Code:', res.statusCode);
      console.log('Response:', responseBody);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(JSON.stringify(data));
  req.end();
}

// Test 1: Valid submission
test({
  name: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  message: 'This is a verification test'
}, 'Valid submission');

// Test 2: Missing mandatory fields
test({
  name: 'Test User',
  email: 'test@example.com'
}, 'Missing phone');

// Test 3: Invalid email
test({
  name: 'Test User',
  email: 'invalid-email',
  phone: '1234567890',
  message: 'Invalid email'
}, 'Invalid email');
