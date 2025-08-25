```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

const mockResults = [
    { id: 1, title: 'Result 1', content: 'Content 1' },
    { id: 2, title: 'Result 2', content: 'Content 2' },
    { id: 3, title: 'Result 3', content: 'Content 3' },
];

const mockMeta = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
    totalPages: 1,
};

describe('SearchResults', () => {
    it('renders search results correctly', () => {
        render(<SearchResults results={mockResults} meta={mockMeta} />);
        mockResults.forEach(result => {
            expect(screen.getByText(result.title)).toBeInTheDocument();
            expect(screen.getByText(result.content)).toBeInTheDocument();
        });
    });

    it('handles pagination correctly', () => {
        const mockLongResults = Array(25).fill(null).map((_, i) => ({
            id: i + 1,
            title: `Result ${i + 1}`,
            content: `Content ${i + 1}`,
        }));

        const mockLongMeta = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 25,
            totalPages: 3,
        };


        render(<SearchResults results={mockLongResults} meta={mockLongMeta} onPageChange={() => {}} />);
        mockLongResults.slice(0, 10).forEach(result => {
            expect(screen.getByText(result.title)).toBeVisible();
        });
        mockLongResults.slice(10).forEach(result => {
            expect(screen.queryByText(result.title)).toBeNull();
        });



    });

    it('displays error message when error prop is true', () => {

        render(<SearchResults results={[]} meta={null} error={true} />);
        expect(screen.getByText(/Error loading search results/i)).toBeVisible();
    });


    it('displays no results message when no results are found', () => {
        render(<SearchResults results={[]} meta={{ ...mockMeta, totalItems: 0 }} />);
        expect(screen.getByText(/No results found/i)).toBeVisible();

    });

});

```