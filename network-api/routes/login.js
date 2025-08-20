```typescript
import { Router } from 'express';
import { AuthService } from '../auth/auth.service'; // Adjust path as needed
import { UsersRepository } from '../auth/users.repository'; // Adjust path as needed
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usersRepository = new UsersRepository(); // Initialize UsersRepository. You might need to adjust this depending on your DI setup.
    const user = await usersRepository.findOneBy({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    const jwtService = new JwtService({ secret: process.env.JWT_SECRET || 'your-secret-key' }); // Inject or create an instance of JwtService
    const payload = { email: user.email, sub: user.id }; // Payload for the JWT
    const token = jwtService.sign(payload);

    return res.status(200).json({ token });

  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;

```