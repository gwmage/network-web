```js
import { Router } from 'express';
import { matchUsers, getMatchingStatus, getMatchingResults, getMatchingVisualization, updateMatchingWeights, getMatchingWeights, getMatchingGroups, updateMatchingGroup } from '../controllers/matching'; // Import necessary functions

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


router.get('/groups', async (req, res) => {
    try {
        const groups = await getMatchingGroups();
        res.json(groups);
    } catch (error) {
        console.error("Error getting matching groups", error);
        res.status(500).json({ error: 'Failed to get matching groups' });
    }
});

router.put('/groups/:groupId', async (req, res) => {
    try {
        const updatedGroup = await updateMatchingGroup(req.params.groupId, req.body);
        res.json(updatedGroup);
    } catch (error) {
        console.error("Error updating matching group:", error);
        res.status(500).json({ error: 'Failed to update matching groups' });
    }
});



router.get('/visualization/:groupId', async (req, res) => {
  try {
    const visualization = await getMatchingVisualization(req.params.groupId);
    res.json(visualization);
  } catch (error) {
    console.error("Error getting matching visualization:", error);
    res.status(500).json({ error: 'Failed to get matching visualization' });
  }
});

router.put('/weights', async (req, res) => {
  try {
    const updatedWeights = await updateMatchingWeights(req.body);
    res.json(updatedWeights);
  } catch (error) {
    console.error("Error updating matching weights:", error);
    res.status(500).json({ error: 'Failed to update matching weights' });
  }
});

router.get('/weights', async (req, res) => {
  try {
    const weights = await getMatchingWeights();
    res.json(weights);
  } catch (error) {
    console.error("Error getting matching weights:", error);
    res.status(500).json({ error: 'Failed to get matching weights' });
  }
});


export default router;
```