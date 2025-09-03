import { Router } from 'express';
import { matchUsers, getMatchingStatus, getMatchingResults } from '../controllers/matching'; // Import getMatchingResults

const router = Router();

router.post('/', async (req, res) => {
  try {
    const results = await matchUsers();
    res.json({ results, notification: 'New match available' });
  } catch (error) {
    console.error("Error during matching:", error);
    res.status(500).json({ error: 'Matching failed' });
  }
});

router.get('/status', async (req, res) => {
  try {
    const status = await getMatchingStatus();
    res.json(status);
  } catch (error) {
    console.error("Error getting matching status:", error);
    res.status(500).json({ error: 'Failed to get matching status' });
  }
});

// GET /matching/results - Get matching results
router.get('/results', async (req, res) => {
  try {
    const results = await getMatchingResults();
    res.json(results);
  } catch (error) {
    console.error("Error getting matching results:", error);
    res.status(500).json({ error: 'Failed to get matching results' });
  }
});

export default router;