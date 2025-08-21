```typescript
import { Router } from 'express';
import { Request, Response } from 'express';
import { Post } from '../entities/post.entity'; // Assuming you have an entity defined
import { getRepository } from 'typeorm'; // Or your preferred data access method

const router = Router();

// Create Post
router.post('/', async (req: Request, res: Response) => {
  try {
    const postRepository = getRepository(Post);
    const newPost = postRepository.create(req.body);
    await postRepository.save(newPost);
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating post' });
  }
});

// Read All Posts with Pagination and Filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const postRepository = getRepository(Post);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const tag = req.query.tag as string;

    const queryBuilder = postRepository.createQueryBuilder('post');

    if (category) {
      queryBuilder.andWhere('post.category = :category', { category });
    }

    if (tag) {
      queryBuilder.andWhere('post.tag = :tag', { tag });
    }

    const [posts, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return res.json({
      data: posts,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving posts' });
  }
});

// Read Post by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const postRepository = getRepository(Post);
    const post = await postRepository.findOne(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving post' });
  }
});


// Update Post
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const postRepository = getRepository(Post);
        const post = await postRepository.findOne(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        postRepository.merge(post, req.body);
        await postRepository.save(post);
        return res.json(post);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating post' });
    }
});


// Delete Post
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const postRepository = getRepository(Post);
        const post = await postRepository.findOne(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await postRepository.remove(post);
        return res.status(204).send(); // No content

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting post' });
    }
});

export default router;

```