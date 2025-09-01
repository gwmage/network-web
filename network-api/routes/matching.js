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
    const criteria = req.body.criteria;
    const results = await matchUsers(criteria); // Pass criteria to matchUsers
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

router.get('/groups', async (req, res) => {
  try {
    const groups = await getMatchingGroups();
    res.json(groups);
  } catch (error) {
    console.error("Error getting matching groups:", error);
    res.status(500).json({ error: 'Failed to get matching groups' });
  }
});


export default router;

```