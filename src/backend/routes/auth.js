const express = require('express');
const User = require('../models/User.js');
const { compare , bcrypt } = require('bcryptjs');
const rateLimit = require('express-rate-limit');


const router = express.Router();

// Basic rate limiting to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});

router.use(limiter);

// Input validation function
const validateRegisterInput = (data) => {
  const { email, ic, id, password, role } = data;
  if (!email || !ic || !id || !password || !role) {
    return false;
  }
  // Add more validation as needed
  return true;
};

router.post('/register', async (req, res) => {
  const { email, ic, id, password, role } = req.body;

  if (!validateRegisterInput(req.body)) {
    return res.status(400).json({ msg: 'Invalid input data' });
  }

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

    const isPasswordValid = await compare(password, user.password);
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

async function verifyUserInDatabase(id, ic, role) {
  try {
    const user = await User.findOne({ id });
    if (user && user.ic === ic && user.role === role) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error verifying user:", error);
    return false;
  }
}

// verify user exists
router.post('/verifyUser', async (req, res) => {
  const { id, ic, role } = req.body;
  
  // Validate input
  if (!id || !ic || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const userExists = await verifyUserInDatabase(id, ic, role);
    if (userExists) {
      return res.json({ success: true });
    } else {
      return res.status(404).json({ success: false, message: 'User not found or details incorrect.' });
    }
  } catch (error) {
    console.error('Error during user verification:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.post('/updatePassword', async (req, res) => {
  const { id, newPassword } = req.body;

  if (!id || !newPassword) {
    return res.status(400).json({ success: false, message: 'ID and new password are required.' });
  }

  try {
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ success: true });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
