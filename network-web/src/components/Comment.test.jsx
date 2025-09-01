```typescript
import { render, screen } from '@testing-library/react';
import Comment from './Comment';

const mockComment = {
    id: 1,
    content: 'Test comment',
    createdAt: '2024-07-29T12:00:00Z',
    author: { username: 'testuser' },
    currentUser: { username: 'testuser' },
    replies: [],
};

const mockCommentWithReplies = {
    ...mockComment,
    replies: [
        {
            id: 2,
            content: 'Reply to comment',
            createdAt: '2024-07-29T13:00:00Z',
            author: { username: 'replyuser' },
            currentUser: { username: 'testuser' },
            replies: [],
        }
    ]
}

const mockCommentOtherUser = {
    ...mockComment,
    currentUser: { username: 'anotheruser' }
}

jest.mock('../services/commentService');

describe('Comment', () => {
    it('renders comment details correctly', () => {
        render(<Comment comment={mockComment} />);
        expect(screen.getByText('Test comment')).toBeInTheDocument();
        expect(screen.getByText('testuser')).toBeInTheDocument();
        // Expecting a formatted date.  Adjust as needed for your formatting.
        expect(screen.getByText(/2024-07-29/i)).toBeInTheDocument();
    });

    it('renders edit/delete buttons for own comment', () => {
        render(<Comment comment={mockComment} />);
        expect(screen.getByRole('button', { name: 'Edit' })).toBeVisible();
        expect(screen.getByRole('button', { name: 'Delete' })).toBeVisible();
    });


    it('does not render edit/delete buttons for other user\'s comment', () => {
        render(<Comment comment={mockCommentOtherUser} />);
        expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Delete' })).toBeNull();

    });

    it('renders nested replies', () => {
        render(<Comment comment={mockCommentWithReplies} />);
        expect(screen.getByText('Reply to comment')).toBeInTheDocument();
    });
});

```