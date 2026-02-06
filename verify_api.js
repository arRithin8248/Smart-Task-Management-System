const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const runVerification = async () => {
    try {
        console.log('1. Testing Root Endpoint...');
        const root = await axios.get('http://localhost:5000/');
        console.log('   Success:', root.data);

        console.log('\n2. Testing Registration...');
        const userEmail = `test${Date.now()}@example.com`;
        const register = await axios.post(`${API_URL}/auth/register`, {
            name: 'Test Verify',
            email: userEmail,
            password: 'password123'
        });
        console.log('   Success: User created with ID', register.data._id);
        const token = register.data.token;

        console.log('\n3. Testing Login...');
        const login = await axios.post(`${API_URL}/auth/login`, {
            email: userEmail,
            password: 'password123'
        });
        console.log('   Success: Login successful, token received');

        console.log('\n4. Testing Create Task...');
        const taskConfig = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const task = await axios.post(`${API_URL}/tasks`, {
            title: 'Verification Task',
            description: 'Created via script',
            priority: 'High'
        }, taskConfig);
        console.log('   Success: Task created with ID', task.data._id);

        console.log('\n5. Testing Get Tasks...');
        const tasks = await axios.get(`${API_URL}/tasks`, taskConfig);
        console.log('   Success: Retrieved', tasks.data.length, 'tasks');
        const found = tasks.data.find(t => t._id === task.data._id);
        if (found) console.log('   Verified: Created task is in the list');
        else console.error('   Error: Created task not found in list');

        console.log('\nVerification Complete!');

    } catch (error) {
        console.error('Verification Failed:', error.response ? error.response.data : error.message);
    }
};

runVerification();
