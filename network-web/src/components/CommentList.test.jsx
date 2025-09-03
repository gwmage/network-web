```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import CommentList from './CommentList';

describe('CommentList', () => {
  const mockComments = [
    { id: 1, content: 'First comment', createdAt: '2024-01-01T12:00:00Z', replies: [] },
    {
      id: 2,
      content: 'Second comment',
      createdAt: '2024-01-02T12:00:00Z',
      replies: [
        { id: 3, content: 'Reply to second comment', createdAt: '2024-01-03T12:00:00Z', replies: [] },
      ],
    },
    { id: 4, content: 'Third comment', createdAt: '2024-01-04T12:00:00Z', replies: [] },
  ];

  it('renders without crashing', () => {
    render(<CommentList comments={[]} isLoading={false} error={null} />);
  });

  it('renders the correct number of comments', () => {
    render(<CommentList comments={mockComments} isLoading={false} error={null} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(mockComments.length);
  });

  it('renders the comment content', () => {
    render(<CommentList comments={mockComments} isLoading={false} error={null} />);
    mockComments.forEach((comment) => {
      expect(screen.getByText(comment.content)).toBeInTheDocument();
    });
  });

  it('renders the comment creation date', () => {
    render(<CommentList comments={mockComments} isLoading={false} error={null} />);
    mockComments.forEach((comment) => {
      const date = new Date(comment.createdAt);
      expect(screen.getByText(date.toLocaleDateString())).toBeInTheDocument();
      expect(screen.getByText(date.toLocaleTimeString())).toBeInTheDocument();
    });
  });

  it('renders nested comments', () => {
    render(<CommentList comments={mockComments} isLoading={false} error={null} />);
    expect(screen.getByText('Reply to second comment')).toBeInTheDocument();
  });

  it('handles empty comments array', () => {
    render(<CommentList comments={[]} isLoading={false} error={null} />);
    expect(screen.getByText('No comments yet')).toBeInTheDocument();
  });

  it('displays loading indicator when isLoading is true', () => {
    render(<CommentList comments={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading comments...')).toBeInTheDocument(); 
  });

  it('displays error message when error is present', () => {
    render(<CommentList comments={[]} isLoading={false} error="Failed to load comments" />);
    expect(screen.getByText('Failed to load comments')).toBeInTheDocument();
  });
});

```