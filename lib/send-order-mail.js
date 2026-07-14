const nodemailer = require('nodemailer');
const { buildOrderEmail, formatOrderTime } = require('../email-template');

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

  if (!user || !pass) {
    throw new Error('SMTP_USER or SMTP_PASS is not configured.');
  }

  return {
    user,
    notifyTo: process.env.NOTIFY_EMAIL || user,
    transporter: nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user, pass },
    }),
  };
}

async function sendOrderMail(payload) {
  const { plan, price, vehicleType, vin, email } = payload || {};

  if (!plan || !price || !vehicleType || !vin || !email) {
    return { status: 400, body: { ok: false, error: 'Missing required fields.' } };
  }

  const vinClean = String(vin).trim().toUpperCase();
  const emailClean = String(email).trim();
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const vinReg = /^[A-HJ-NPR-Z0-9]{17}$/;

  if (!vinReg.test(vinClean)) {
    return { status: 400, body: { ok: false, error: 'Invalid VIN.' } };
  }
  if (!emailReg.test(emailClean)) {
    return { status: 400, body: { ok: false, error: 'Invalid email.' } };
  }

  const { user, notifyTo, transporter } = getTransporter();
  const { subject, text, html } = buildOrderEmail({
    plan,
    price,
    vehicleType,
    vin: vinClean,
    email: emailClean,
    timestamp: formatOrderTime(),
  });

  await transporter.sendMail({
    from: `"Vehicle Check" <${user}>`,
    to: notifyTo,
    replyTo: emailClean,
    subject,
    text,
    html,
  });

  return { status: 200, body: { ok: true } };
}

module.exports = { sendOrderMail };
