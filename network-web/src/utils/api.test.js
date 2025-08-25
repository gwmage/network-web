```typescript
import { getPosts, getPost, createPost, updatePost, deletePost } from './api';

jest.mock('./api', () => ({
  getPosts: jest.fn(),
  getPost: jest.fn(),
  createPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
}));


describe('API Utils - Posts', () => {

    describe('getPosts', () => {
        it('should return posts successfully with pagination', async () => {
            const mockResponse = {
                items: [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }],
                meta: { currentPage: 1, itemsPerPage: 10, totalItems: 2, totalPages: 1 },
            };
            (getPosts as jest.Mock).mockResolvedValue(mockResponse);

            const response = await getPosts({ page: 1, limit: 10 });
            expect(getPosts).toHaveBeenCalledWith({ page: 1, limit: 10 });
            expect(response).toEqual(mockResponse);
        });

        it('should handle errors when fetching posts', async () => {
            const error = new Error('Failed to fetch posts');
            (getPosts as jest.Mock).mockRejectedValue(error);

            await expect(getPosts({ page: 1, limit: 10 })).rejects.toThrowError(error);
        });
    });


    describe('getPost', () => {
        it('should return a single post successfully', async () => {
            const postId = 1;
            const mockResponse = { id: postId, title: 'Post 1' };
            (getPost as jest.Mock).mockResolvedValue(mockResponse);
    
            const response = await getPost(postId);
            expect(getPost).toHaveBeenCalledWith(postId);
            expect(response).toEqual(mockResponse);
        });
    
        it('should handle errors when fetching a single post', async () => {
            const postId = 1;
            const error = new Error('Failed to fetch post');
            (getPost as jest.Mock).mockRejectedValue(error);
    
            await expect(getPost(postId)).rejects.toThrowError(error);
        });
    });

    // Similar tests for createPost, updatePost and deletePost

    describe('createPost', () => {
        it('should create a post successfully', async () => {
            // Implementation for createPost test
            const postData = { title: 'New Post', content: 'New content' };
            const mockResponse = { id: 1, ...postData };
            (createPost as jest.Mock).mockResolvedValue(mockResponse);

            const response = await createPost(postData);
            expect(createPost).toHaveBeenCalledWith(postData);
            expect(response).toEqual(mockResponse);

        });
    });

    describe('updatePost', () => {
        it('should update a post successfully', async () => {
             // Implementation for updatePost test
            const postId = 1;
            const postData = { title: 'Updated Post', content: 'Updated content' };
            const mockResponse = { id: postId, ...postData };
            (updatePost as jest.Mock).mockResolvedValue(mockResponse);

            const response = await updatePost(postId, postData);
            expect(updatePost).toHaveBeenCalledWith(postId, postData);
            expect(response).toEqual(mockResponse);
        });
    });

    describe('deletePost', () => {
        it('should delete a post successfully', async () => {
            // Implementation for deletePost test
            const postId = 1;
            (deletePost as jest.Mock).mockResolvedValue(undefined);

            await deletePost(postId);
            expect(deletePost).toHaveBeenCalledWith(postId);
        });
    });



});

```