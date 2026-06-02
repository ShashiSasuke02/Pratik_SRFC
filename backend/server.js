const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Helper to get config data
const getConfig = () => {
  const configPath = path.join(__dirname, 'data', 'config.json');
  const fileData = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(fileData);
};

// ─── Dynamic Email Transport Factory ───────────────────────────────────────
const createEmailTransporter = () => {
  const provider = (process.env.EMAIL_PROVIDER || 'gmail').toLowerCase();

  if (provider === 'brevo') {
    console.log('[Email] Using Brevo (Sendinblue) SMTP provider');
    return nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });
  }

  // Default: Gmail
  console.log('[Email] Using Gmail SMTP provider');
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const transporter = createEmailTransporter();
// ───────────────────────────────────────────────────────────────────────────

// Endpoint to fetch config data (for the frontend to consume dynamically)
app.get('/api/config', (req, res) => {
  try {
    const config = getConfig();
    res.json(config);
  } catch (error) {
    console.error("Error reading config:", error);
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

// Endpoint to submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, mobile, service, message } = req.body;

    // Basic validation
    if (!fullName || !email || !mobile || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to SQLite via Prisma
    const submission = await prisma.contactSubmission.create({
      data: {
        fullName,
        email,
        mobile,
        service: service || 'General Inquiry',
        message,
      },
    });

    // Send Email Notification
    const fromAddress = process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_USER;
    const toAddress = process.env.EMAIL_TO_ADDRESS || process.env.EMAIL_USER;

    const mailOptions = {
      from: `"SRFC Website" <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `🔔 New Lead: ${service || 'General Inquiry'} from ${fullName}`,
      text: `
You have a new contact form submission on SRFC Website:

Name: ${fullName}
Email: ${email}
Mobile: ${mobile}
Service Interested: ${service || 'Not specified'}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <div style="background: #E11D48; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">🔔 New Lead from SRFC Website</h1>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 12px 0; color: #6b7280; font-weight: bold; width: 150px;">Name</td>
                <td style="padding: 12px 0; color: #111827;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 12px 0; color: #6b7280; font-weight: bold;">Email</td>
                <td style="padding: 12px 0; color: #111827;"><a href="mailto:${email}" style="color: #E11D48;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 12px 0; color: #6b7280; font-weight: bold;">Mobile</td>
                <td style="padding: 12px 0; color: #111827;">${mobile}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 12px 0; color: #6b7280; font-weight: bold;">Service</td>
                <td style="padding: 12px 0; color: #111827;">${service || 'Not specified'}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="color: #6b7280; font-weight: bold; margin-bottom: 8px;">Message</p>
              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; color: #374151; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #E11D48; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Reply to ${fullName}</a>
            </div>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">SRFC Website — Automated Lead Notification</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("[Email] Error sending email:", error);
      } else {
        console.log('[Email] Email sent successfully: ' + info.response);
      }
    });

    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error("Error saving submission:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static frontend build
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
