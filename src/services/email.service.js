require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Backend Ledger!";
  const text = `Hi ${name},\n\nWe're excited to have you on board.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `
    <p>Hi ${name},</p>
    <p>We're excited to have you on board.</p>
    <p>Best regards,<br>The Backend Ledger Team</p>
  `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = "New Transaction Alert!";
    const text = `Hi ${name},\n\nA new transaction of ${amount} has been made to your account ${toAccount}.\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `
      <p>Hi ${name},</p>
      <p>A new transaction of <strong>${amount}</strong> has been made to your account <strong>${toAccount}</strong>.</p>
      <p>Best regards,<br>The Backend Ledger Team</p>
    `;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmailFailureEmail(userEmail, name, amount, toAccount) {
    const subject = "Transaction Failed!";
    const text = `Hi ${name},\n\nA transaction of ${amount} from your account ${toAccount} has failed.\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `
      <p>Hi ${name},</p>
      <p>A transaction of <strong>${amount}</strong> from your account <strong>${toAccount}</strong> has failed.</p>
      <p>Best regards,<br>The Backend Ledger Team</p>
    `;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {  sendRegistrationEmail, sendTransactionEmail, sendTransactionEmailFailureEmail };    