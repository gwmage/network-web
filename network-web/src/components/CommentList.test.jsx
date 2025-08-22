```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import CommentList from './CommentList';

describe('CommentList', () => {
  const mockComments = [
    { id: 1, content: 'First comment', createdAt: '2024-01-01T12:00:00Z' },
    { id: 2, content: 'Second comment', createdAt: '2024-01-02T12:00:00Z' },
  ];

  it('renders without crashing', () => {
    render(<CommentList comments={[]} />);
  });

  it('renders the correct number of comments', () => {
    render(<CommentList comments={mockComments} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(mockComments.length);
  });

  it('renders the comment content', () => {
    render(<CommentList comments={mockComments} />);
    mockComments.forEach((comment) => {
      expect(screen.getByText(comment.content)).toBeInTheDocument();
    });
  });

  it('renders the comment creation date', () => {
      render(<CommentList comments={mockComments} />);
      mockComments.forEach((comment) => {
          // Adjust formatting as needed for how your component displays the date.  This example uses toLocaleDateString.
          const formattedDate = new Date(comment.createdAt).toLocaleDateString();
          expect(screen.getByText(formattedDate)).toBeInTheDocument(); 
      });
  });


  it('displays a message when there are no comments', () => {
    render(<CommentList comments={[]} />);
    expect(screen.getByText('No comments yet.')).toBeInTheDocument();
  });
});

```