const express = require('express');
const User = require('../models/User.js');
const { compare } = require('bcryptjs');
const { genSalt, hash } = require('bcryptjs');


const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, ic, id, password, role } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ email, ic, id, password, role });

    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error 1');
  }
});

router.post('/login', async (req, res) => {
  const { id, password, role } = req.body;

  try {
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const isPasswordValid = await compare(password, user.password); // Compare provided password with hashed password from the database

    if (isPasswordValid && user.role === role) {
      return res.status(200).json({ success: true, message: 'Login successful', user: { id: user.id, role: user.role } });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


module.exports = router;
