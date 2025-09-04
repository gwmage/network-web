import { Router } from 'express';
import { registerUser } from '../controllers/register';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { username, email, password, region, preferences, interests, name, phoneNumber } = req.body; // Add name and phoneNumber
        const user = await registerUser(username, email, password, region, preferences, interests, name, phoneNumber); // Pass name and phoneNumber to the controller
        res.json(user);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(400).json({ message: error.message, errors: error.errors }); // Send both general message and specific errors
    }
});


// Update User Profile (This route likely should be in a separate file, e.g., user.js)
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
---[END_OF_FILES]---