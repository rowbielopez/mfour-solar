import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const BUSINESS_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'jua_electrical_services@yahoo.com';

function validateField(value: unknown, name: string, maxLen = 500): string | null {
  if (typeof value !== 'string' || value.trim().length === 0) return `${name} is required.`;
  if (value.trim().length > maxLen) return `${name} is too long.`;
  return null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\+\-\(\)]{7,20}$/.test(phone.trim());
}

const ALLOWED_TYPES = ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Other'];

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, phone, email, type, message } = body as Record<string, unknown>;

  // Server-side validation
  const errors: Record<string, string> = {};

  const nameErr = validateField(name, 'Name', 100);
  if (nameErr) errors.name = nameErr;

  const phoneErr = validateField(phone, 'Phone', 30);
  if (phoneErr) errors.phone = phoneErr;
  else if (!isValidPhone(phone as string)) errors.phone = 'Enter a valid phone number.';

  const emailErr = validateField(email, 'Email', 200);
  if (emailErr) errors.email = emailErr;
  else if (!isValidEmail(email as string)) errors.email = 'Enter a valid email address.';

  if (typeof type !== 'string' || !ALLOWED_TYPES.includes(type)) {
    errors.type = 'Select a valid property type.';
  }

  if (typeof message === 'string' && message.length > 2000) {
    errors.message = 'Message must be under 2000 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // Build email HTML
  const safeField = (v: unknown) =>
    String(v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const submittedAt = new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const notificationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:sans-serif;color:#1a2e1a;margin:0;padding:0;background:#f4f4f5">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">
        <tr><td style="background:#062005;padding:24px 32px">
          <p style="margin:0;color:#a3d977;font-size:13px;letter-spacing:.1em;text-transform:uppercase">New Inquiry</p>
          <h1 style="margin:4px 0 0;color:#fff;font-size:22px">Quote Request Received</h1>
        </td></tr>
        <tr><td style="padding:32px">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><strong>Name</strong></td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${safeField(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><strong>Phone</strong></td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${safeField(phone)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><strong>Email</strong></td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${safeField(email)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><strong>Property Type</strong></td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${safeField(type)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;vertical-align:top"><strong>Message</strong></td>
              <td style="padding:10px 0;white-space:pre-wrap">${safeField(message) || '<em>No message provided</em>'}</td>
            </tr>
          </table>
          <p style="color:#888;font-size:12px;margin-top:24px">Submitted on ${submittedAt}</p>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:16px 32px;text-align:center">
          <p style="margin:0;font-size:12px;color:#aaa">M4 Solar &amp; Electrical Services · Tuguegarao City, Cagayan</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const confirmationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:sans-serif;color:#1a2e1a;margin:0;padding:0;background:#f4f4f5">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">
        <tr><td style="background:#062005;padding:24px 32px">
          <p style="margin:0;color:#a3d977;font-size:13px;letter-spacing:.1em;text-transform:uppercase">M4 Solar &amp; Electrical Services</p>
          <h1 style="margin:4px 0 0;color:#fff;font-size:22px">We Got Your Message!</h1>
        </td></tr>
        <tr><td style="padding:32px">
          <p>Hi <strong>${safeField(name)}</strong>,</p>
          <p>Thank you for reaching out! We've received your inquiry about a <strong>${safeField(type)}</strong> solar installation and will get back to you within <strong>24 hours</strong> on business days.</p>
          <p>While you wait, feel free to:</p>
          <ul>
            <li>Message us on <a href="https://www.facebook.com/profile.php?id=61588860696904" style="color:#5a8a00">Facebook</a> for a faster response</li>
            <li>Call us at <a href="tel:+639159717213" style="color:#5a8a00">0915-971-7213</a></li>
          </ul>
          <p style="color:#888;font-size:13px">This is an automated confirmation. Please do not reply to this email.</p>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:16px 32px;text-align:center">
          <p style="margin:0;font-size:12px;color:#aaa">M4 Solar &amp; Electrical Services · Tuguegarao City, Cagayan</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"M4 Solar Website" <${process.env.SMTP_USER}>`,
      to: BUSINESS_EMAIL,
      replyTo: email as string,
      subject: `New Quote Request from ${name} — ${type}`,
      html: notificationHtml,
    });

    // Best-effort confirmation to customer (don't fail if this errors)
    try {
      await transporter.sendMail({
        from: `"M4 Solar & Electrical Services" <${process.env.SMTP_USER}>`,
        to: email as string,
        subject: 'We received your inquiry — M4 Solar',
        html: confirmationHtml,
      });
    } catch {
      // Confirmation email failure is non-critical
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact/route] SMTP error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try calling or messaging us on Facebook.' },
      { status: 500 }
    );
  }
}
