require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { buildOrderEmail, formatOrderTime } = require('./email-template');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || SMTP_USER;

if (!SMTP_USER || !SMTP_PASS) {
  console.error('Missing SMTP_USER or SMTP_PASS in .env');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

app.use(cors());
app.use(express.json({ limit: '32kb' }));
app.use(express.static(__dirname));

app.post('/api/send-order', async (req, res) => {
  try {
    const { plan, price, vehicleType, vin, email } = req.body || {};

    if (!plan || !price || !vehicleType || !vin || !email) {
      return res.status(400).json({ ok: false, error: 'Missing required fields.' });
    }

    const vinClean = String(vin).trim().toUpperCase();
    const emailClean = String(email).trim();
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const vinReg = /^[A-HJ-NPR-Z0-9]{17}$/;

    if (!vinReg.test(vinClean)) {
      return res.status(400).json({ ok: false, error: 'Invalid VIN.' });
    }
    if (!emailReg.test(emailClean)) {
      return res.status(400).json({ ok: false, error: 'Invalid email.' });
    }

    const { subject, text, html } = buildOrderEmail({
      plan,
      price,
      vehicleType,
      vin: vinClean,
      email: emailClean,
      timestamp: formatOrderTime(),
    });

    await transporter.sendMail({
      from: `"Vehicle Check" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      replyTo: emailClean,
      subject,
      text,
      html,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('SMTP send failed:', err.message);
    return res.status(500).json({ ok: false, error: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
  console.log(`SMTP → ${SMTP_USER} (Google SMTP)`);
});
