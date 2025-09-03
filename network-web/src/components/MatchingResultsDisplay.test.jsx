"import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchingResultsDisplay from './MatchingResultsDisplay';

describe('MatchingResultsDisplay Component', () => {
  it('renders no results message when no results are provided', () => {
    render(<MatchingResultsDisplay />); // Render without any results
    expect(screen.getByText('No results available.')).toBeInTheDocument();
  });

  it('renders matching results correctly', () => {
    const results = [
      { users: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }] },
      { users: [{ id: 3, name: 'User 3' }] },
    ];
    const explanations = ['Explanation 1', 'Explanation 2'];

    render(<MatchingResultsDisplay results={results} explanations={explanations} />);

    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
    expect(screen.getByText('Explanation: Explanation 1')).toBeInTheDocument();

    expect(screen.getByText('Group 2')).toBeInTheDocument();
    expect(screen.getByText('User 3')).toBeInTheDocument();
    expect(screen.getByText('Explanation: Explanation 2')).toBeInTheDocument();
  });
});"