import { connectToDatabase } from '../../../utils/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content, postId, author } = req.body;

    // Validation
    if (!content || !postId || !author) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const db = await connectToDatabase();
    const collection = db.collection('comments');

    const newComment = {
      content,
      postId: new ObjectId(postId), // Convert postId to ObjectId
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newComment);

    res.status(201).json({ message: 'Comment created successfully', commentId: result.insertedId });
  } catch (error) {
    console.error('Error creating comment:', error);

    if (error.name === 'BSONTypeError') {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}