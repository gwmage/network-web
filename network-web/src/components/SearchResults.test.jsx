```typescript
import React from 'react';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import SearchResults from './SearchResults';


const mockResults = [
    { 
        id: 1, 
        title: 'Result 1', 
        content: 'Content 1',
        comments: [
            { id: 101, content: 'Comment 1', createdAt: '2024-07-29T12:00:00Z', author: { username: 'user1' } },
            { id: 102, content: 'Comment 2', createdAt: '2024-07-29T13:00:00Z', author: { username: 'user2' } },
        ]
    },
    { id: 2, title: 'Result 2', content: 'Content 2', comments: [] },
    { id: 3, title: 'Result 3', content: 'Content 3', comments: [] },
];

const mockMeta = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
    totalPages: 1,
};

const mockOnNextPage = jest.fn();
const mockOnPrevPage = jest.fn();
const mockOnSort = jest.fn();
const mockOnFilter = jest.fn();
const mockOnSearch = jest.fn();
const mockOnDownload = jest.fn();


describe('SearchResults', () => {

    it('displays results correctly', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} />);
        mockResults.forEach(result => {
            expect(screen.getByText(result.title)).toBeVisible();
            expect(screen.getByText(result.content)).toBeVisible();
        });
    });

    it('handles pagination', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} onNextPage={mockOnNextPage} onPrevPage={mockOnPrevPage} />);
        fireEvent.click(screen.getByText('Next'));
        expect(mockOnNextPage).toHaveBeenCalled();
        fireEvent.click(screen.getByText('Previous'));
        expect(mockOnPrevPage).toHaveBeenCalled();

    });


    it('displays comments for a result', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} />);
        const resultWithComments = mockResults[0];
        const resultContainer = screen.getByText(resultWithComments.title).closest('div'); 

        resultWithComments.comments.forEach(comment => {
            expect(within(resultContainer).getByText(comment.content)).toBeVisible();
        });
    });



    it('renders comment form and list', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} />);
        const commentForm = screen.getByRole('form', { name: /add comment/i });
        expect(commentForm).toBeInTheDocument();

        const commentLists = screen.getAllByRole('list');
        expect(commentLists.length).toBeGreaterThanOrEqual(1)

    });

    it('handles sorting', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} onSort={mockOnSort} />);
        // Simulate sorting - replace with actual implementation if available        
        fireEvent.click(screen.getByText(/sort/i)); // Replace with your actual sort element
        expect(mockOnSort).toHaveBeenCalled();
    });

    it('handles filtering', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} onFilter={mockOnFilter} />);
        // Simulate filtering - replace with actual implementation if available
        fireEvent.change(screen.getByRole('textbox', { name: /filter/i }), { target: { value: 'test' } }); // Example filter input
        fireEvent.click(screen.getByRole('button', { name: /apply filter/i })); // Example filter button
        expect(mockOnFilter).toHaveBeenCalled();

    });

    it('handles searching', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} onSearch={mockOnSearch} />);
        const searchInput = screen.getByRole('textbox', { name: /search/i }); // Replace with your actual search input
        fireEvent.change(searchInput, { target: { value: 'test' } });
        fireEvent.submit(screen.getByRole('search')); // Or submit however your search is triggered
        expect(mockOnSearch).toHaveBeenCalled();
    });


    it('handles downloading', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} onDownload={mockOnDownload} />);
        fireEvent.click(screen.getByRole('button', { name: /download/i })); // Replace with your actual download button
        expect(mockOnDownload).toHaveBeenCalled();
    });

    it('renders loading state', () => {
        render(<SearchResults loading={true} results={[]} meta={mockMeta} />);
        expect(screen.getByText('Loading...')).toBeVisible(); // Or your specific loading indicator
    });

    it('renders no results message', () => {
        render(<SearchResults loading={false} results={[]} meta={{ ...mockMeta, totalItems: 0 }} />);
        expect(screen.getByText('No results found.')).toBeVisible(); // Or your specific message
    });

    // Add tests for responsive behavior (e.g., using resize or different viewport settings)
    it('adapts to different screen sizes', () => {
        // Mock window.resizeTo or similar to simulate different screen sizes
        // Then assert on expected UI changes (e.g., changes in layout, visibility of elements)
        // This might require more specific queries depending on your implementation
        render(<SearchResults results={mockResults} meta={mockMeta} />);
        // Example: Check if a specific element becomes hidden on smaller screens
        // const element = screen.getByTestId('some-element');
        // window.resizeTo(320, 480); // Simulate mobile viewport
        // expect(element).not.toBeVisible();
        // window.resizeTo(1024, 768); // Simulate desktop viewport
        // expect(element).toBeVisible();

    });

});
```