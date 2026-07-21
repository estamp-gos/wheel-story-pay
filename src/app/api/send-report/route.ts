import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query, type, price, email } = body || {};

    const to = process.env.REPORT_TO || "rmoto7817@gmail.com";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const from = process.env.SMTP_USER || `no-reply@example.com`;

    const subject = `New VIN/Plate check request: ${query}`;
    const text = `VIN/Plate: ${query}\nType: ${type}\nPrice: ${price}\nSubmitted email: ${email || "N/A"}`;
    const html = `<p><strong>VIN/Plate:</strong> ${query}</p><p><strong>Type:</strong> ${type}</p><p><strong>Price:</strong> ${price}</p><p><strong>Submitted email:</strong> ${email || "N/A"}</p>`;

    await transporter.sendMail({ from, to, subject, text, html });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
