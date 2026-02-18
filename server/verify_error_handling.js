require('dotenv').config();
// Using standard http to avoid dependency issues

// Using standard http to avoid dependency issues if axios isn't installed
const http = require('http');

const data = JSON.stringify({
    name: 'Invalid Email Tester',
    mobile: '1234567890',
    email: 'test-user@this-domain-totally-does-not-exist-12345.com',
    experience: '0',
    projects: 'Test',
    role: 'Tester',
    skills: 'Testing',
    portfolio: '',
    resume: null // Logic handles null file
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/apply',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Testing with INVALID email...');

const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Response Body: ${responseData}`);

        if (res.statusCode === 500 || res.statusCode === 400) {
            console.log('✅ Success: Server correctly returned an error for invalid email.');
        } else if (res.statusCode === 200) {
            console.log('❌ Failure: Server returned 200 OK for invalid email (expected error).');
        } else {
            console.log('❓ Unexpected status code.');
        }
    });
});

req.on('error', (error) => {
    console.error('Request Error:', error);
});

req.write(data);
req.end();
