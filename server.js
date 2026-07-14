require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { sendOrderMail } = require('./lib/send-order-mail');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json({ limit: '32kb' }));
app.use(express.static(__dirname));

app.post('/api/send-order', async (req, res) => {
  try {
    const result = await sendOrderMail(req.body);
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error('SMTP send failed:', err.message);
    return res.status(500).json({ ok: false, error: 'Failed to send email.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
  console.log('POST /api/send-order uses Google SMTP (Nodemailer)');
});
