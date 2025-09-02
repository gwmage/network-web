// File: network-api/routes/matching.js
const express = require('express');
const router = express.Router();
const { getMatchingStatus/*, other functions you might have here */ } = require('../controllers/matching'); // Import necessary controller function

// ... your other routes

router.get('/status', async (req, res) => {
  try {
    const status = await getMatchingStatus();
    res.json(status);
  } catch (error) {
    console.error("Error getting matching status:", JSON.stringify(error, null, 2)); // Log the full error object for better debugging
    res.status(500).json({ error: 'Failed to get matching status' });
  }
});

export default router;