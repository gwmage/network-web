```typescript
import { getNotificationStatus } from '../controllers/notifications'; // Import the controller function

// ... other routes

// GET /users/{userId}/notifications/status - Get user's notification status
router.get('/users/:userId/notifications/status', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10); // Extract userId from the URL parameters
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    const status = await getNotificationStatus(userId); // Call the controller function
    res.json(status); 
  } catch (error) {
    console.error('Error fetching notification status:', error);
    res.status(500).json({ error: 'Failed to fetch notification status' }); // Generic error message for now
  }
});

export default router;

```
