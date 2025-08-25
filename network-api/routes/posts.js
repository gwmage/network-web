```typescript
import { Router } from 'express';
import { Request, Response } from 'express';
import { Post } from '../entities/post.entity';
import { getRepository } from 'typeorm';

const router = Router();

// ... other routes ...

// Read All Posts with Pagination and Filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const postRepository = getRepository(Post);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const tag = req.query.tag as string;
    const regions = req.query.regions as string[] || [];
    const interestAreas = req.query.interestAreas as string[] || [];


    const queryBuilder = postRepository.createQueryBuilder('post');

    if (category) {
      queryBuilder.andWhere('post.category = :category', { category });
    }

    if (tag) {
      queryBuilder.andWhere('post.tag = :tag', { tag });
    }

    if (regions.length > 0) {
      queryBuilder.andWhere('post.region IN (:...regions)', { regions });
    }

    if (interestAreas.length > 0) {
      interestAreas.forEach((interestArea) => {
        queryBuilder.andWhere(`post.interestAreas LIKE :interestArea`, { interestArea: `%${interestArea}%` });
      });
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

// ... other routes ...

export default router;

```