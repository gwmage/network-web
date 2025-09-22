import { connectToDatabase } from '../../../utils/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const db = await connectToDatabase();
  const collection = db.collection('posts');

  try {
    const _id = new ObjectId(id);

    switch (req.method) {
      case 'GET':
        const post = await collection.findOne({ _id });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        return res.status(200).json(post);

      case 'PUT':
        // ... (validation and authentication logic)
        const updatedPost = await collection.findOneAndUpdate(
          { _id },
          { $set: { ...req.body, updatedAt: new Date() } },
          { returnDocument: 'after' }
        );
        if (!updatedPost.value) return res.status(404).json({ message: 'Post not found' });
        return res.status(200).json({ message: 'Post updated', post: updatedPost.value });

      case 'DELETE':
        // ... (authentication logic)
        const result = await collection.deleteOne({ _id });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Post not found' });
        return res.status(200).json({ message: 'Post deleted' });

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling post:', error);
    if (error.name === 'BSONTypeError') return res.status(400).json({ message: 'Invalid post ID' }); 
    return res.status(500).json({ message: 'Internal server error' });
  }
}