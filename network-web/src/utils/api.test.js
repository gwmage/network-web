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
    const commentData = { content: 'New comment' };
    const mockResponse = { id: 1, ...commentData };
    (createComment as jest.Mock).mockResolvedValue(mockResponse);

    const response = await createComment(postId, commentData);
    expect(createComment).toHaveBeenCalledWith(postId, commentData);
    expect(response).toEqual(mockResponse);
  });

  it('should handle error during comment creation', async () => {
    const postId = 1;
    const commentData = { content: 'New comment' };
    const error = new Error('Failed to create comment');
    (createComment as jest.Mock).mockRejectedValue(error);

    await expect(createComment(postId, commentData)).rejects.toThrowError(error);
  });


  it('should update a comment successfully', async () => {
    const postId = 1;
    const commentId = 1;
    const commentData = { content: 'Updated comment' };
    const mockResponse = { id: commentId, ...commentData };
    (updateComment as jest.Mock).mockResolvedValue(mockResponse);

    const response = await updateComment(postId, commentId, commentData);
    expect(updateComment).toHaveBeenCalledWith(postId, commentId, commentData);
    expect(response).toEqual(mockResponse);
  });

  it('should handle error during comment update', async () => {
    const postId = 1;
    const commentId = 1;
    const commentData = { content: 'Updated comment' };
    const error = new Error('Failed to update comment');
    (updateComment as jest.Mock).mockRejectedValue(error);

    await expect(updateComment(postId, commentId, commentData)).rejects.toThrowError(error);
  });

  it('should delete a comment successfully', async () => {
    const postId = 1;
    const commentId = 1;
    (deleteComment as jest.Mock).mockResolvedValue(undefined);

    await deleteComment(postId, commentId);
    expect(deleteComment).toHaveBeenCalledWith(postId, commentId);
  });

    it('should handle error during comment deletion', async () => {
        const postId = 1;
        const commentId = 1;
        const error = new Error('Failed to delete comment');
        (deleteComment as jest.Mock).mockRejectedValue(error);

        await expect(deleteComment(postId, commentId)).rejects.toThrowError(error);
    });



});

```