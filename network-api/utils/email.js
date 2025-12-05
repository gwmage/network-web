import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeEmail(email, name) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to Our Network!',
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining our community. We're excited to have you on board.</p>
      <p>Best,</p>
      <p>The Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Note: We don't throw an error here to not fail the signup process
    // if the email service is down. Log it for monitoring.
  }
}