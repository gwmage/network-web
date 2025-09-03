```typescript
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import SearchResults from './SearchResults';


const mockResults = [
    { 
        id: 1, 
        title: 'Result 1', 
        content: 'Content 1',
        comments: [
            { id: 101, content: 'Comment 1', createdAt: '2024-07-29T12:00:00Z', author: { username: 'user1' } },
            { id: 102, content: 'Comment 2', createdAt: '2024-07-29T13:00:00Z', author: { username: 'user2' } },
        ],
        hasNewComments: true // Add notification indicator flag
    },
    { id: 2, title: 'Result 2', content: 'Content 2', comments: [], hasNewComments: false },
    { id: 3, title: 'Result 3', content: 'Content 3', comments: [], hasNewComments: true },
];

const mockMeta = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
    totalPages: 1,
};

describe('SearchResults', () => {

    it('displays notification indicator for results with new comments', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} />);
        const resultWithNotification = mockResults.filter(result => result.hasNewComments);

        resultWithNotification.forEach(result => {
            const notificationIndicator = within(screen.getByText(result.title).closest('div')).getByTestId('notification-indicator'); // Assuming you use data-testid
            expect(notificationIndicator).toBeVisible();
        });


        const resultsWithoutNotification = mockResults.filter(result => !result.hasNewComments);
        resultsWithoutNotification.forEach(result => {
          const notificationIndicator = within(screen.getByText(result.title).closest('div')).queryByTestId('notification-indicator');
          expect(notificationIndicator).toBeNull();
        })


    });

    it('displays comments for a result', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} />);
        const resultWithComments = mockResults[0];
        const resultContainer = screen.getByText(resultWithComments.title).closest('div'); // Find the container for this result

        resultWithComments.comments.forEach(comment => {
            expect(within(resultContainer).getByText(comment.content)).toBeVisible();
        });
    });


    it('renders comment form and list', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} />);
        const commentForm = screen.getByRole('form', { name: /add comment/i });
        expect(commentForm).toBeInTheDocument();

        // Check if comment list is rendered (even if empty for some results)
        const commentLists = screen.getAllByRole('list');
        expect(commentLists.length).toBeGreaterThanOrEqual(1)

    })
});

```