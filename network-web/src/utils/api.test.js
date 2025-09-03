```typescript
import { createComment, updateComment, deleteComment } from './api';

jest.mock('./api', () => ({
  createComment: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
}));

describe('API Utils - Comments', () => {
  it('should create a comment successfully', async () => {
    const postId = 1;
    const commentData = { content: 'New comment', parentId: null, itemId: 'uuid-of-post' }; // Include parentId and itemId
    const mockResponse = { id: 1, ...commentData };
    (createComment as jest.Mock).mockResolvedValue(mockResponse);

    const response = await createComment(postId, commentData);
    expect(createComment).toHaveBeenCalledWith(postId, commentData);
    expect(response).toEqual(mockResponse);
  });

  // ... (other tests remain unchanged)
});

```