const express = require('express');
const User = require('../models/User.js');
const { compare , bcrypt } = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const { sendResetEmail } = require('../../utils/emailService.js');

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

// Password reset request endpoint
router.post('/reset-password-request', async (req, res) => {
  const { ic, id, role } = req.body;

  try {
    const user = await User.findOne({ ic, id, role });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid user information' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send reset email
    await sendResetEmail(user.email, resetToken);

    res.status(200).json({ msg: 'Password reset email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Password reset endpoint
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
