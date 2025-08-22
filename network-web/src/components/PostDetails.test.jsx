```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';
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
  { id: 1, content: 'Comment 1', createdAt: '2024-01-01', author: { username: 'user1' } },
  { id: 2, content: 'Comment 2', createdAt: '2024-01-02', author: { username: 'user2' } },
];

describe('PostDetails', () => {
  it('renders post details correctly', () => {
    render(<PostDetails post={mockPost} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('displays comments', () => {
    render(<PostDetails post={{ ...mockPost, comments: mockComments }} />);
    mockComments.forEach((comment) => {
      expect(screen.getByText(comment.content)).toBeInTheDocument();
    });
  });


  it('creates a new comment', async () => {
    render(<PostDetails post={mockPost} />);

    const commentInput = screen.getByRole('textbox');
    fireEvent.change(commentInput, { target: { value: 'New comment' } });
    fireEvent.submit(commentInput.closest("form"));


    expect(createComment).toHaveBeenCalledWith(mockPost.id, { content: 'New comment' });
    await expect(createComment(mockPost.id, { content: 'New comment' })).resolves.not.toThrow();

  });

  it('updates an existing comment', async () => {

    render(<PostDetails post={{ ...mockPost, comments: mockComments }} />);

    const updateMock = jest.fn().mockResolvedValue(null);
    updateComment.mockImplementation(updateMock)

    fireEvent.click(screen.getByRole('button', {name: /edit comment 1/i}))

    const commentInput = screen.getByRole('textbox');
    fireEvent.change(commentInput, { target: { value: 'Updated comment' } });
    fireEvent.submit(commentInput.closest("form"));

    expect(updateComment).toHaveBeenCalled();



  });

  it('deletes a comment', async () => {
      const deleteMock = jest.fn().mockResolvedValue(null);
      deleteComment.mockImplementation(deleteMock);

    render(<PostDetails post={{ ...mockPost, comments: mockComments }} />);

    fireEvent.click(screen.getByRole('button', {name: /delete comment 1/i}))

    expect(deleteComment).toHaveBeenCalledWith(mockPost.id, mockComments[0].id);

  });



});

```