```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchingResultsDisplay from './MatchingResultsDisplay';

describe('MatchingResultsDisplay', () => {
  it('renders "No matching results found" when no results are provided', () => {
    render(<MatchingResultsDisplay results={null} />);
    expect(screen.getByText('No matching results found.')).toBeInTheDocument();
  });

  it('renders "No matching results found" when results array is empty', () => {
    render(<MatchingResultsDisplay results={[]} />);
    expect(screen.getByText('No matching results found.')).toBeInTheDocument();
  });

  it('renders matching results correctly', () => {
    const mockResults = [
      { id: 1, users: [{ id: 101, name: 'User A' }, { id: 102, name: 'User B' }] },
      { id: 2, users: [{ id: 103, name: 'User C' }] },
    ];

    render(<MatchingResultsDisplay results={mockResults} />);
    expect(screen.getByText('Group ID')).toBeInTheDocument();
    expect(screen.getByText('User IDs')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('101, 102')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('103')).toBeInTheDocument();

  });


  // Test for additional columns / data as needed.
});

```