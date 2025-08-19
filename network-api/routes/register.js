```typescript
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { createUser } from '../services/user.service';


const router = Router();

router.post(
  '/',
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('name').notEmpty().withMessage('Name is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name, phoneNumber } = req.body;
      const user = await createUser({ email, password, name, phoneNumber });
      res.status(201).json({ message: 'User registered successfully', user });

    } catch (error) {
      if (error.code === 11000) { // Duplicate key error (email)
        return res.status(409).json({ message: 'Email already exists' });
      }
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default router;

```