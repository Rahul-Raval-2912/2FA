require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3000;

const codes = {};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, //add by using .env  
    pass: process.env.EMAIL_PASS  //add by using .env
  }
});


app.use(bodyParser.json());


function generateCode() {
  return crypto.randomInt(100000, 999999).toString();
}

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

app.post('/auth/verify', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' });
  }

  if (!codes[email]) {
    return res.status(404).json({ error: 'No verification code found for this email' });
  }

  const stored = codes[email];

  if (Date.now() - stored.timestamp > 60000) {
    delete codes[email];
    return res.status(400).json({ error: 'Code expired' });
  }

  stored.attempts += 1;
  if (stored.attempts > 5) {
    delete codes[email];
    return res.status(400).json({ error: 'Maximum attempts exceeded' });
  }

  if (stored.code === code) {
    delete codes[email]; 
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});