// File: network-api/routes/matching.js
const router = require('express').Router();

// ... other route handlers ...

router.post('/', async (req, res) => {
  try {
    const result = await startMatching(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error during matching process:", error);
    res.status(500).json({ statusCode: 500, message: `Error during matching process: ${error.message}`, errorDetails: error }); // Include more error details
  }
});

router.get('/status', async (req, res) => {
  try {
    const status = await getMatchingStatus();
    res.json(status);
  } catch (error) {
    console.error("Error getting matching status:", error);
    res.status(500).json({ error: 'Failed to get matching status', errorDetails: error }); // Include more error details
  }
});

export default router;
