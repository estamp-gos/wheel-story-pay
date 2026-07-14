function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatOrderTime(date = new Date()) {
  try {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch (e) {
    return date.toISOString();
  }
}

function buildOrderEmail({ plan, price, vehicleType, vin, email, timestamp }) {
  const safe = {
    plan: escapeHtml(plan),
    price: escapeHtml(price),
    vehicleType: escapeHtml(vehicleType),
    vin: escapeHtml(vin),
    email: escapeHtml(email),
    time: escapeHtml(timestamp || formatOrderTime()),
  };

  const subject = `New Vehicle Check Order — ${vin}`;

  const text = [
    'New order from the website',
    '',
    `Plan: ${plan}`,
    `Price: ${price}`,
    `Vehicle Type: ${vehicleType}`,
    `VIN: ${vin}`,
    `Customer Email: ${email}`,
    `Time: ${timestamp || formatOrderTime()}`,
  ].join('\n');

  const row = (label, value, mono = false) => `
    <tr>
      <td style="padding:12px 0; border-bottom:1px solid #E2E8F0; width:38%; font-size:13px; color:#64748B; font-family:Arial,Helvetica,sans-serif;">
        ${label}
      </td>
      <td style="padding:12px 0; border-bottom:1px solid #E2E8F0; font-size:14px; color:#0F172A; font-weight:600; font-family:${mono ? "'Courier New',Courier,monospace" : 'Arial,Helvetica,sans-serif'}; word-break:break-all;">
        ${value}
      </td>
    </tr>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0; padding:0; background:#F1F5F9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F1F5F9; padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px; background:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid #E2E8F0;">
          <tr>
            <td style="background:linear-gradient(135deg,#0052FF,#4D7CFF); padding:28px 32px;">
              <p style="margin:0 0 6px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.85); font-family:Arial,Helvetica,sans-serif;">
                Vehicle Check
              </p>
              <h1 style="margin:0; font-size:22px; line-height:1.3; color:#FFFFFF; font-family:Arial,Helvetica,sans-serif; font-weight:700;">
                New order received
              </h1>
              <p style="margin:10px 0 0; font-size:14px; color:rgba(255,255,255,0.9); font-family:Arial,Helvetica,sans-serif;">
                A customer submitted the report form and is heading to checkout.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 4px; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#64748B; font-family:Arial,Helvetica,sans-serif;">
                      Order amount
                    </p>
                    <p style="margin:0; font-size:28px; font-weight:700; color:#0052FF; font-family:Arial,Helvetica,sans-serif;">
                      ${safe.price}
                    </p>
                    <p style="margin:6px 0 0; font-size:14px; color:#0F172A; font-family:Arial,Helvetica,sans-serif;">
                      ${safe.plan}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                ${row('Plan', safe.plan)}
                ${row('Price', safe.price)}
                ${row('Vehicle Type', safe.vehicleType)}
                ${row('VIN', safe.vin, true)}
                ${row('Customer Email', `<a href="mailto:${safe.email}" style="color:#0052FF; text-decoration:none;">${safe.email}</a>`)}
                ${row('Time', safe.time)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;">
              <p style="margin:0; padding:14px 16px; background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; font-size:13px; line-height:1.5; color:#1E3A8A; font-family:Arial,Helvetica,sans-serif;">
                Reply to this email to contact the customer directly at <strong>${safe.email}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 22px; border-top:1px solid #E2E8F0; background:#FAFAFA;">
              <p style="margin:0; font-size:11px; color:#94A3B8; font-family:Arial,Helvetica,sans-serif; text-align:center;">
                Vehicle Check · Automated order notification
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

module.exports = { buildOrderEmail, formatOrderTime };
