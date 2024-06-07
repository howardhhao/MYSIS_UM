const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();
const port = 5050;

// Middleware to run CORS
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'HEAD'],
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Import and use the login route
const loginRoute = require('../api/login');
app.use('/login', loginRoute);

// Handle other methods
app.use((req, res) => {
    return res.status(405).json({ message: 'Method Not Allowed' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
