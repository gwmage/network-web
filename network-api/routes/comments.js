```typescript
import * as express from 'express';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { Post } from '../entity/Post';

const router = express.Router();

// Create a new comment
router.post('/', async (req: Request, res: Response) => {
  try {
    const { postId, content } = req.body;
    const post = await getRepository(Post).findOne(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment();
    comment.content = content;
    comment.post = post; 

    await getRepository(Comment).save(comment);

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create comment' });
  }
});

// Get all comments for a post
router.get('/:postId', async (req: Request, res: Response) => {
  try {
    const comments = await getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId: req.params.postId })
      .getMany();

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch comments' });
  }
});


// Update a comment
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const comment = await getRepository(Comment).findOne(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.content = content;
    await getRepository(Comment).save(comment);

    return res.status(200).json(comment);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to update comment' });
  }
});

// Delete a comment
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const comment = await getRepository(Comment).findOne(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await getRepository(Comment).remove(comment);

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete comment' });
  }
});


export default router;

```