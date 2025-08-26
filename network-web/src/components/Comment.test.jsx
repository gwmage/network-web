```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Comment from './Comment';

const mockComment = {
    id: 1,
    content: 'Test comment',
    createdAt: '2024-07-29T12:00:00Z',
    author: { username: 'testuser' },
    currentUser: { username: 'testuser' },
};

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
        expect(screen.getByText(/2024/i)).toBeInTheDocument();
    });


    it('renders edit/delete buttons for own comment', () => {
        render(<Comment comment={mockComment} />);

        expect(screen.getByRole('button', { name: /edit/i })).toBeVisible();
        expect(screen.getByRole('button', { name: /delete/i })).toBeVisible();

    })

    it('does not render edit/delete buttons for other user\'s comment', () => {
        render(<Comment comment={mockCommentOtherUser} />);
        expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();

    })

    it('updates a comment', async () => {
        const mockOnEdit = jest.fn();

        render(<Comment comment={mockComment} onEditComment={mockOnEdit} />);

        fireEvent.click(screen.getByRole('button', { name: /edit/i }));


        const input = screen.getByRole('textbox');

        await userEvent.type(input, "Updated Text")
        fireEvent.submit(input.closest("form"));



        expect(mockOnEdit).toHaveBeenCalledWith(mockComment.id, "Updated Text");
    });



    it('deletes a comment', async () => {

        const mockOnDelete = jest.fn();
        render(<Comment comment={mockComment} onDeleteComment={mockOnDelete} />);

        fireEvent.click(screen.getByRole('button', { name: /delete/i }));


        expect(mockOnDelete).toHaveBeenCalledWith(mockComment.id);
    });


});

```