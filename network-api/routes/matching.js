```typescript
import { Router } from 'express';
import { matchUsers } from '../controllers/matching';
import { getMatchingStatus } from '../controllers/matching'; // Import the status function

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

export default router;
```