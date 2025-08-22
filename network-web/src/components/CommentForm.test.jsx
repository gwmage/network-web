```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommentForm from './CommentForm';
import { createComment, updateComment } from '../utils/api';

jest.mock('../utils/api');

describe('CommentForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  afterEach(() => {
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

  it('displays error message if createComment fails', async () => {
    (createComment as jest.Mock).mockRejectedValue(new Error('Failed to create comment'));
    render(<CommentForm onSubmit={mockOnSubmit} onClose={mockOnClose} postId={1} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'New comment' } });
    fireEvent.submit(screen.getByRole('form'));
    await screen.findByText('Failed to create comment');


  });


  it('displays error message if updateComment fails', async () => {
    const comment = { id: 1, content: 'Original comment' };
    (updateComment as jest.Mock).mockRejectedValue(new Error('Failed to update comment'));
    render(<CommentForm comment={comment} onSubmit={mockOnSubmit} onClose={mockOnClose} postId={1} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Updated comment' } });
    fireEvent.submit(screen.getByRole('form'));
    await screen.findByText('Failed to update comment');
  });
});
```