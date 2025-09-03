```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Comment from './Comment';
import { updateComment, deleteComment } from '../services/commentService'; // Adjust path as needed

jest.mock('../services/commentService');

const mockComment = {
  id: 1,
  content: 'Test comment',
  createdAt: '2024-01-01',
  author: { username: 'testuser' },
  postId: 1,
};

describe('Comment', () => {
  it('renders comment details correctly', () => {
    render(<Comment comment={mockComment} />);
    expect(screen.getByText('Test comment')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    // Add more expectations for other details like date if needed
  });

  it('updates an existing comment', async () => {
    const updatedComment = { ...mockComment, content: 'Updated comment' };
    const updateMock = jest.fn().mockResolvedValue(updatedComment);
    updateComment.mockImplementation(updateMock);
    render(<Comment comment={mockComment} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Updated comment' } });
    fireEvent.submit(inputElement.closest('form')); // or appropriate submit action

    await waitFor(() => {
      expect(updateComment).toHaveBeenCalledWith(mockComment.postId, mockComment.id, { content: 'Updated comment' });
    });
    expect(screen.getByText('Updated comment')).toBeInTheDocument();
  });

  it('deletes a comment', async () => {
    const deleteMock = jest.fn().mockResolvedValue(null);
    deleteComment.mockImplementation(deleteMock);
    render(<Comment comment={mockComment} />);

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    await waitFor(() => {
      expect(deleteComment).toHaveBeenCalledWith(mockComment.postId, mockComment.id);
    });
    // Expect the comment to be removed or some indication of deletion
    expect(screen.queryByText('Test comment')).not.toBeInTheDocument(); // or check for a deleted message
  });
});
```