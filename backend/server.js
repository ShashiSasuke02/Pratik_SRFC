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

// Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to themselves
      replyTo: email,
      subject: `New Lead: ${service || 'General Inquiry'} from ${fullName}`,
      text: `
You have a new contact form submission on SRFC Website:

Name: ${fullName}
Email: ${email}
Mobile: ${mobile}
Service Interested: ${service || 'Not specified'}

Message:
${message}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // We won't crash the request if email fails, but we'll log it.
      } else {
        console.log('Email sent: ' + info.response);
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
