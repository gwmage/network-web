```typescript
import { Router } from 'express';
import { Request, Response } from 'express';
import { Post } from '../entities/post.entity';
import { getRepository } from 'typeorm';
import { Like } from "typeorm";

const router = Router();

// ... other routes ...

// Keyword-based Post Search with Sorting and Filtering
router.get('/search', async (req: Request, res: Response) => {
  try {
    const postRepository = getRepository(Post);
    const keyword = req.query.keyword as string;
    const sort = req.query.sort as string || 'recency';
    const title = req.query.title as string;
    const content = req.query.content as string;
    const author = req.query.author as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const queryBuilder = postRepository.createQueryBuilder('post');

    if (keyword) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('post.title LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('post.content LIKE :keyword', { keyword: `%${keyword}%` });
        }),
      );
    }

    if (title) {
      queryBuilder.andWhere('post.title LIKE :title', { title: `%${title}%` });
    }

    if (content) {
      queryBuilder.andWhere('post.content LIKE :content', { content: `%${content}%` });
    }

    if (author) {
      queryBuilder.andWhere('post.author LIKE :author', { author: `%${author}%` });
    }


    if (sort === 'relevance') {
        // Implement relevance sorting (e.g., using a full-text search engine or custom logic)
        // For simplicity, using a basic LIKE operator based search for relevance.
        if (keyword) {
          queryBuilder.orderBy(`post.title LIKE :keyword`, 'DESC');
          queryBuilder.addOrderBy(`post.content LIKE :keyword`, 'DESC');
        } else {
          queryBuilder.orderBy('post.createdAt', 'DESC'); // Default to recency if no keyword
        }
    } else {
      queryBuilder.orderBy('post.createdAt', 'DESC');
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
    return res.status(500).json({ message: 'Error searching posts' });
  }
});

// ... other routes ...

export default router;

```