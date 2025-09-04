const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
// const nodemailer = require('nodemailer'); // Example using Nodemailer - install it: npm install nodemailer

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    try {
      const { email, password, name, phoneNumber } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({ email, password: hashedPassword, name, phoneNumber });
      await newUser.save();


      //  Example email sending using Nodemailer (commented out - uncomment and configure)
      /*
      const transporter = nodemailer.createTransport({
        service: 'your_email_service', // e.g., 'gmail'
        auth: {
          user: 'your_email@example.com',
          pass: 'your_email_password',
        },
      });

      const mailOptions = {
        from: 'your_email@example.com',
        to: email,
        subject: 'Welcome to Network!',
        text: 'Thank you for registering!',
      };

      await transporter.sendMail(mailOptions);
      */

      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;