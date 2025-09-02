// File: network-api/routes/matching.js
const express = require('express');
const router = express.Router();

// ... (import necessary functions like getMatchingStatus, startMatching, etc.)

router.post('/start', async (req, res) => {
  try {
    const { groupId } = req.body;
    const result = await startMatching(groupId);
    res.json(result);
  } catch (error) {
    console.error("Error starting matching:", error); // Log the full error object
    res.status(500).json({ statusCode: 500, message: `Error during matching process: ${error.message}` });
  }
});

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
