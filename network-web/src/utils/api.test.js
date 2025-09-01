```typescript
import { getPosts, getPost, createPost, updatePost, deletePost, getComments, createComment, updateComment, deleteComment } from './api';

jest.mock('./api', () => ({
    getPosts: jest.fn(),
    getPost: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
    getComments: jest.fn(),
    createComment: jest.fn(),
    updateComment: jest.fn(),
    deleteComment: jest.fn(),
}));


describe('API Utils - Comments', () => {
    describe('getComments', () => {
        it('should return comments for a post successfully', async () => {
            const postId = 1;
            const mockResponse = [{ id: 1, content: 'Comment 1' }, { id: 2, content: 'Comment 2' }];
            (getComments as jest.Mock).mockResolvedValue(mockResponse);

            const response = await getComments(postId);
            expect(getComments).toHaveBeenCalledWith(postId);
            expect(response).toEqual(mockResponse);
        });
    });

    describe('createComment', () => {
        it('should create a comment successfully', async () => {
            const postId = 1;
            const commentData = { content: 'New comment' };
            const mockResponse = { id: 1, ...commentData };
            (createComment as jest.Mock).mockResolvedValue(mockResponse);

            const response = await createComment(postId, commentData);
            expect(createComment).toHaveBeenCalledWith(postId, commentData);
            expect(response).toEqual(mockResponse);

        });
    });

    describe('updateComment', () => {
        it('should update a comment successfully', async () => {
            const commentId = 1;
            const commentData = { content: 'Updated comment' };
            const mockResponse = { id: 1, ...commentData };
            (updateComment as jest.Mock).mockResolvedValue(mockResponse);

            const response = await updateComment(commentId, commentData);
            expect(updateComment).toHaveBeenCalledWith(commentId, commentData);
            expect(response).toEqual(mockResponse);
        });
    });


    describe('deleteComment', () => {
        it('should delete a comment successfully', async () => {
            const commentId = 1;
            (deleteComment as jest.Mock).mockResolvedValue(undefined);

            await deleteComment(commentId);
            expect(deleteComment).toHaveBeenCalledWith(commentId);
        });
    });
});

```