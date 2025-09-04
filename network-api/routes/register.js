import { Router } from 'express';
import { registerUser } from '../controllers/register';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { username, email, password, region, preferences, interests } = req.body;
        const user = await registerUser(username, email, password, region, preferences, interests);
        res.json(user);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(400).json({ error: error.message }); // Send specific error message
    }
});

// Update User Profile
router.put('/me', async (req, res) => {
    try {
      // Assuming you have middleware to authenticate and attach the user to req.user
      const userId = req.user.id;
      const { region, preferences, interests } = req.body;

      const updatedUser = await updateUser(userId, { region, preferences, interests });

      res.json(updatedUser);

    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
});

export default router;