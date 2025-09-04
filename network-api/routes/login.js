import { Router } from 'express';
import { UsersRepository } from '../auth/users.repository'; // Adjust path as needed
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findOneBy({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const jwtService = new JwtService({ secret: process.env.JWT_SECRET || 'your-secret-key' });
    const payload = { email: user.email, sub: user.id };
    const token = jwtService.sign(payload);

    return res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email }, // Include user details
    });

  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

---[END_OF_FILES]---