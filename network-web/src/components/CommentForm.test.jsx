```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import CommentForm from './CommentForm';
import { createComment, updateComment } from '../services/commentService';

jest.mock('../services/commentService');

const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders without crashing', () => {
  render(<CommentForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);
});

it('updates content on change', () => {
  render(<CommentForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);
  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: 'Test comment' } });
  expect(inputElement.value).toBe('Test comment');
});

it('calls createComment on submit when creating a new comment', async () => {
  render(<CommentForm onSubmit={mockOnSubmit} onClose={mockOnClose} postId={1} />);
  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: 'New comment' } });
  fireEvent.submit(screen.getByRole('form'));
  expect(createComment).toHaveBeenCalledWith(1, { content: 'New comment' });
  await expect(createComment(1, { content: 'New comment' })).resolves.not.toThrow();
});


it('calls createComment with parentCommentId for replies', async () => {
  render(<CommentForm onSubmit={mockOnSubmit} onClose={mockOnClose} postId={1} parentCommentId={2} />);
  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: 'Reply comment' } });
  fireEvent.submit(screen.getByRole('form'));
  expect(createComment).toHaveBeenCalledWith(1, { content: 'Reply comment', parentCommentId: 2 });
  await expect(createComment(1, { content: 'Reply comment', parentCommentId: 2 })).resolves.not.toThrow();
});



it('calls updateComment on submit when updating a comment', async () => {
  const comment = { id: 1, content: 'Original comment' };
  render(
    <CommentForm
      comment={comment}
      onSubmit={mockOnSubmit}
      onClose={mockOnClose}
      postId={1}
    />
  );
  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: 'Updated comment' } });
  fireEvent.submit(screen.getByRole('form'));

  expect(updateComment).toHaveBeenCalledWith(1, 1, { content: 'Updated comment' }); // postId and commentId
  await expect(updateComment(1, 1, { content: "Updated comment" })).resolves.not.toThrow();
});


it('calls onClose when close button is clicked', () => {
  render(<CommentForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(mockOnClose).toHaveBeenCalled();
});

it('displays error message when input is empty', () => {
  render(<CommentForm onSubmit={mockOnSubmit} onClose={mockOnClose} postId={1} />);
  fireEvent.submit(screen.getByRole('form'));
  expect(screen.getByText('댓글 내용을 입력해주세요.')).toBeVisible(); // Assuming specific error message.
});

it('does not display error message when input is valid', () => {
    render(<CommentForm onSubmit={mockOnSubmit} onClose={mockOnClose} postId={1} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Valid comment' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.queryByText('댓글 내용을 입력해주세요.')).not.toBeInTheDocument(); // Assuming specific error message.

});

```