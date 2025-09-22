import { connectToDatabase } from '../../../utils/db';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('posts');

    const { page = 1, limit = 10, category, tags } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = {};
    if (category) {
      query.category = category;
    }
    if (tags) {
      query.tags = { $in: tags.split(',') }; // Assuming tags are comma-separated
    }

    const posts = await collection.find(query).skip(skip).limit(parseInt(limit)).toArray();
    const totalPosts = await collection.countDocuments(query);


    res.status(200).json({
      posts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPosts / parseInt(limit)),
      totalPosts,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}