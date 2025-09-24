import bcrypt from 'bcrypt';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  console.log('Register request:', req.method, req.url);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, name, phone } = req.body;

  // Validation
  if (!email || !password || !name || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await collection.insertOne({
      email,
      password: hashedPassword,
      name,
      phone,
    });

    console.log('User registered:', result);

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
