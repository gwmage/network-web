import { connectToDatabase } from '../../utils/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  console.log('Posts request:', req.method, req.url);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);

  const db = await connectToDatabase();
  const collection = db.collection('posts');

  switch (req.method) {
    case 'POST':
      try {
        const { title, content, category, tags, author } = req.body;

        // Validation (add more as needed)
        if (!title || !content || !category || !tags || !author) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const newPost = {
          title,
          content,
          category,
          tags,
          author,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await collection.insertOne(newPost);
        console.log('New post created:', result);

        return res.status(201).json({ message: 'Post created', postId: result.insertedId });
      } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
