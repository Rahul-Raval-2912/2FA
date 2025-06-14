require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3000;

// In-memory store for codes (use Redis/database in production)
const codes = {};

// Configure NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Fetch from .env
    pass: process.env.EMAIL_PASS  // Fetch from .env
  }
});

// Middleware
app.use(bodyParser.json());

// Generate a random 6-digit code
function generateCode() {
  return crypto.randomInt(100000, 999999).toString();
}

// Send verification email
async function sendVerificationEmail(email, code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code}. It expires in 1 minute.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Request code endpoint
app.post('/auth/request', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const code = generateCode();
  const timestamp = Date.now();
  codes[email] = { code, timestamp, attempts: 0 };

  const emailSent = await sendVerificationEmail(email, code);
  if (!emailSent) {
    delete codes[email];
    return res.status(500).json({ error: 'Failed to send email' });
  }

  res.json({ message: 'Verification code sent' });
});

// Verify code endpoint
app.post('/auth/verify', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' });
  }

  if (!codes[email]) {
    return res.status(404).json({ error: 'No verification code found for this email' });
  }

  const stored = codes[email];
  // Check if code is expired (1 minute = 60,000 ms)
  if (Date.now() - stored.timestamp > 60000) {
    delete codes[email];
    return res.status(400).json({ error: 'Code expired' });
  }

  // Increment attempts
  stored.attempts += 1;
  if (stored.attempts > 5) {
    delete codes[email];
    return res.status(400).json({ error: 'Maximum attempts exceeded' });
  }

  if (stored.code === code) {
    delete codes[email]; // Clear code after successful verification
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});