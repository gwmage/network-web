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

    const { 
      push_enabled, 
      email_enabled, 
      new_message_notifications,
      new_connection_notifications,
      matching_result_notifications,
      time_window_start,
      time_window_end
    } = req.body;

    // ... logic to update preferences in database ...
    // Example:
    // await db.updateUserNotificationPreferences(userId, {
    //   push_enabled, email_enabled, new_message_notifications, //...
    // });

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


// GET /users/:userId/notifications/matching - Get matching result notifications
router.get('/users/:userId/notifications/matching', authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    // ... logic to retrieve matching notifications from the database ...
    const matchingNotifications = []; // Replace with actual data from the database
    res.json(matchingNotifications);
  } catch (error) {
    console.error('Error fetching matching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch matching notifications' });
  }
});


// GET /users/:userId/notifications/preferences
router.get('/users/:userId/notifications/preferences', authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }


    // Replace with actual data fetching logic
    const preferences = {
      push_enabled: true,
      email_enabled: false,
      new_message_notifications: true,
      new_connection_notifications: false,
      matching_result_notifications: true,
      time_window_start: '09:00',
      time_window_end: '17:00'
    };

    res.json(preferences);

  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    res.status(500).json({ error: 'Failed to fetch notification preferences' });
  }
});



export default router;