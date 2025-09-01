```typescript
import { Router } from 'express';
import { matchUsers, getMatchingStatus, getMatchingGroups } from '../controllers/matching';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const results = await matchUsers();
    res.json(results);
  } catch (error) {
    console.error("Error during matching:", error);
    res.status(500).json({ error: 'Matching failed' });
  }
});


router.post('/run', async (req, res) => {
  try {
    const criteria = req.body; // No need for .criteria, it's the whole body
    if (!criteria.region || typeof criteria.region !== 'string' || !criteria.region.trim()) {
      return res.status(400).json({ statusCode: 400, message: "Invalid input: region must be a non-empty string" });
    }

    const results = await matchUsers(criteria);
    res.json(results);
  } catch (error) {
    console.error("Error during matching:", error);
    res.status(500).json({ statusCode: 500, message: `Error during matching process: ${error.message}` });
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

export default router;

```