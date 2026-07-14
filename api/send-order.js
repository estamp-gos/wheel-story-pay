const { sendOrderMail } = require('../lib/send-order-mail');

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (e) {
      return {};
    }
  }
  return req.body;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  try {
    const result = await sendOrderMail(parseBody(req));
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error('SMTP send failed:', err.message);
    return res.status(500).json({
      ok: false,
      error: 'Failed to send email. Check SMTP env vars on Vercel.',
    });
  }
};
