import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../utils/db';
import { validateEmail, validatePassword, validateName, validateContact } from '../../utils/validation';
import { sendWelcomeEmail } from '../../utils/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, name, contact } = req.body;

  // Validate inputs
  const emailError = validateEmail(email);
  if (emailError) return res.status(400).json({ message: emailError });

  const passwordError = validatePassword(password);
  if (passwordError) return res.status(400).json({ message: passwordError });

  const nameError = validateName(name);
  if (nameError) return res.status(400).json({ message: nameError });
  
  const contactError = validateContact(contact);
  if (contactError) return res.status(400).json({ message: contactError });

  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await collection.insertOne({
      email,
      password: hashedPassword,
      name,
      contact,
      createdAt: new Date(),
    });

    // Send welcome email without blocking the response
    sendWelcomeEmail(email, name).catch(console.error);

    return res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Error signing up user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}