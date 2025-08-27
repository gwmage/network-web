```typescript
import { render, screen } from '@testing-library/react';
import MatchingResults from './MatchingResults';

describe('MatchingResults Component', () => {
  it('renders loading state correctly', () => {
    render(<MatchingResults loading={true} matches={[]} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders no matches message correctly', () => {
    render(<MatchingResults loading={false} matches={[]} />);
    expect(screen.getByText('No matches found.')).toBeInTheDocument();
  });

  it('renders matches correctly', () => {
    const matches = [
      { id: 1, users: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }] },
      { id: 2, users: [{ id: 3, name: 'User 3' }, { id: 4, name: 'User 4' }] },
    ];
    render(<MatchingResults loading={false} matches={matches} />);
    expect(screen.getByText('Match 1')).toBeInTheDocument();
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
    expect(screen.getByText('Match 2')).toBeInTheDocument();
    expect(screen.getByText('User 3')).toBeInTheDocument();
    expect(screen.getByText('User 4')).toBeInTheDocument();
  });

  it('handles error state correctly', () => {
    render(<MatchingResults loading={false} error="Error fetching matches" matches={[]} />);
    expect(screen.getByText('Error fetching matches')).toBeInTheDocument();
  });


  it('should render message when matches is null', () => {
    render(<MatchingResults loading={false} matches={null} />);
    expect(screen.getByText('No matches found.')).toBeInTheDocument(); // Or a relevant placeholder message
  });

});

```