```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetails from './PostDetails';
import { createComment, updateComment, deleteComment } from '../services/commentService'; // Adjust path as needed

jest.mock('../services/commentService'); // Mock the comment service

const mockPost = {
  id: 1,
  title: 'Test Post',
  content: 'Test content',
  comments: [],
};

const mockComments = [
  { id: 1, content: 'Comment 1', createdAt: '2024-01-01T12:00:00Z', author: { username: 'user1' } },
  { id: 2, content: 'Comment 2', createdAt: '2024-01-02T12:00:00Z', author: { username: 'user2' } },
];

describe('PostDetails', () => {
  // ... other tests ...

  it('creates a new comment', async () => {
    const createMock = jest.fn().mockResolvedValue({ id: 3, content: 'New comment', createdAt: '2024-01-03T12:00:00Z', author: { username: 'user3' } });
    createComment.mockImplementation(createMock);
    render(<PostDetails post={mockPost} />);

    const commentInput = screen.getByRole('textbox');
    fireEvent.change(commentInput, { target: { value: 'New comment' } });
    fireEvent.submit(commentInput.closest('form'));

    await waitFor(() => {
      expect(createComment).toHaveBeenCalledWith(mockPost.id, { content: 'New comment' });
    });

    expect(screen.getByText('New comment')).toBeInTheDocument();


  });

  it('updates an existing comment', async () => {
    const updatedComment = { ...mockComments[0], content: 'Updated comment' };
    const updateMock = jest.fn().mockResolvedValue(updatedComment);
    updateComment.mockImplementation(updateMock);

    render(<PostDetails post={{ ...mockPost, comments: mockComments }} />);

    fireEvent.click(screen.getByRole('button', { name: /edit comment 1/i }));

    const commentInput = screen.getByRole('textbox');
    fireEvent.change(commentInput, { target: { value: 'Updated comment' } });
    fireEvent.submit(commentInput.closest('form'));

    await waitFor(() => {
      expect(updateComment).toHaveBeenCalledWith(mockPost.id, mockComments[0].id, { content: 'Updated comment' });
    });
    expect(screen.getByText('Updated comment')).toBeInTheDocument();

  });

  it('deletes a comment', async () => {
    const deleteMock = jest.fn().mockResolvedValue(null);
    deleteComment.mockImplementation(deleteMock);

    render(<PostDetails post={{ ...mockPost, comments: mockComments }} />);

    fireEvent.click(screen.getByRole('button', { name: /delete comment 1/i }));

    await waitFor(() => {
      expect(deleteComment).toHaveBeenCalledWith(mockPost.id, mockComments[0].id);
    });
    expect(screen.queryByText('Comment 1')).not.toBeInTheDocument();


  });
});

```