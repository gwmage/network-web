```typescript
import { Router } from 'express';
import { matchUsers } from '../controllers/matching';

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

export default router;

```