import { connectToDatabase } from '../../../../utils/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const db = await connectToDatabase();
  const collection = db.collection('comments');

  try {
      const _id = new ObjectId(id);

      switch (req.method) {
        case 'PUT':
          // ... (validation and authentication logic)
          const updatedComment = await collection.findOneAndUpdate(
            { _id },
            { $set: { ...req.body, updatedAt: new Date() } },
            { returnDocument: 'after' }
          );
          if (!updatedComment.value) return res.status(404).json({ message: 'Comment not found' });
          return res.status(200).json({ message: 'Comment updated', comment: updatedComment.value});

        case 'DELETE':
          // ... (authentication logic)
          const result = await collection.deleteOne({ _id });
          if (result.deletedCount === 0) return res.status(404).json({ message: 'Comment not found' });
          return res.status(200).json({ message: 'Comment deleted' });

        default:
          return res.status(405).json({ message: 'Method not allowed' });
      }
  } catch (error) {
      console.error("Error handling comment:", error);
      if (error.name === 'BSONTypeError') return res.status(400).json({ message: 'Invalid comment ID' });
      return res.status(500).json({ message: 'Internal server error' });
  }
}