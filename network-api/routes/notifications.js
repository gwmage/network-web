import { Router } from 'express';
import { getNotificationStatus } from '../controllers/notifications';
import authMiddleware from '../middleware/auth'; // Import auth middleware

const router = Router();

// ... other routes

router.get('/users/:userId/notifications/status', authMiddleware, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
      }
  
      const status = await getNotificationStatus(userId);
      res.json(status);
    } catch (error) {
      console.error('Error fetching notification status:', error);
      res.status(500).json({ error: 'Failed to fetch notification status' });
    }
  });

// PUT /users/:userId/notifications/preferences - Update notification preferences
router.put('/users/:userId/notifications/preferences', authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    // ... logic to update preferences in database ...
    // Example: Update preferences based on req.body

    res.json({ message: 'Notification preferences updated successfully' });
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    res.status(500).json({ error: 'Failed to update notification preferences' });
  }
});

// GET /users/:userId/notifications - Get past notifications
router.get('/users/:userId/notifications', authMiddleware, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
      }
  
      // ... logic to retrieve notifications from the database ...
      const notifications = []; // Replace with actual data from the database
      res.json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });

export default router;