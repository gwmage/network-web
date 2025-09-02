// File: network-api/routes/matching.js
const express = require('express');
const router = express.Router();
const { getMatchingStatus } = require('../controllers/matchingController');

router.get('/status', async (req, res) => {
  try {
    const status = await getMatchingStatus();
    res.json(status);
  } catch (error) {
    console.error("Error getting matching status:", error); // Log the full error object
    res.status(500).json({ error: 'Failed to get matching status' });
  }
});

export default router;