// File: network-api/routes/matching.js
const express = require('express');
const router = express.Router();
const { getMatchingStatus } = require('../services/matchingService'); // Assuming you have a service for matching logic

// ... other routes ...

router.get('/status', async (req, res) => {
  try {
    const status = await getMatchingStatus();
    res.json(status);
  } catch (error) {
    console.error("Error getting matching status:", error);
    res.status(500).json({ error: 'Failed to get matching status' });
  }
});

export default router;