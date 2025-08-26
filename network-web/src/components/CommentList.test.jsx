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
      // Adjust date format as needed
      expect(screen.getByText(new Date(comment.createdAt).toLocaleString())).toBeInTheDocument();
    });
  });

  it('renders nested comments', () => {
    render(<CommentList comments={mockComments} isLoading={false} error={null} />);
    expect(screen.getByText('Reply to second comment')).toBeInTheDocument();
  });

  it('handles empty comments array', () => {
    render(<CommentList comments={[]} isLoading={false} error={null} />);
    // Check for a message or placeholder, for example
    // expect(screen.getByText('No comments yet')).toBeInTheDocument();
  });

  it('handles comments with no replies', () => {
    render(<CommentList comments={[{ id: 1, content: 'Test', createdAt: '2024-01-05T12:00:00Z', replies: [] }]} isLoading={false} error={null} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles comments with deeply nested replies', () => {
    const deeplyNestedComments = [
      {
        id: 1,
        content: 'First comment',
        createdAt: '2024-01-01T12:00:00Z',
        replies: [
          {
            id: 2,
            content: 'Reply to first comment',
            createdAt: '2024-01-02T12:00:00Z',
            replies: [
              {
                id: 3,
                content: 'Reply to reply',
                createdAt: '2024-01-03T12:00:00Z',
                replies: [],
              },
            ],
          },
        ],
      },
    ];
    render(<CommentList comments={deeplyNestedComments} isLoading={false} error={null} />);
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Reply to first comment')).toBeInTheDocument();
    expect(screen.getByText('Reply to reply')).toBeInTheDocument();
  });

  it('displays loading indicator when isLoading is true', () => {
    render(<CommentList comments={[]} isLoading={true} error={null} />);
    // Check for loading indicator, e.g.,
    expect(screen.getByText('Loading comments...')).toBeInTheDocument(); // Or your specific loading indicator
  });

  it('displays error message when error is present', () => {
    render(<CommentList comments={[]} isLoading={false} error="Failed to load comments" />);
    expect(screen.getByText('Failed to load comments')).toBeInTheDocument();
  });
});

```