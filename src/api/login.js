const express = require('express');
const router = express.Router();

// Mock user database
const users = [
    { username: 'siti', password: '12345678', role: 'Staff' },
    { username: 'Howard', password: '88888888', role: 'Student' },
];

router.post('/', (req, res) => {
    const { username, password, role } = req.body;

    const user = users.find(user => user.username === username && user.password === password && user.role.toLowerCase() === role.toLowerCase());
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful' });
});

module.exports = router;
