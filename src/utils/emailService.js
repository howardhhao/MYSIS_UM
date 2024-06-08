const nodemailer = require('nodemailer');

// Create a transporter object with your SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send a reset email
const sendResetEmail = async (email, resetToken) => {
  const resetURL = `http://your-website.com/reset-password?token=${resetToken}`;
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           ${resetURL}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
