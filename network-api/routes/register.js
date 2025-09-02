// File: network-api/routes/register.js

const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes'); // if you are using this library
// ... other imports ...

router.post('/', async (req, res) => {
  try {
    // ... existing registration logic
  } catch (error) {
    console.error("Error during registration:", error); // Log the full error for better debugging

    if (error.name === 'ValidationError') { // Example for handling validation errors
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Validation failed',
        errors: error.errors || {},
      });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Registration failed' });
    }
  }
});

// ... other routes ...

export default router;