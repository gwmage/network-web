```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchingResults from './MatchingResults';
import axios from 'axios';
import { toast } from 'react-toastify';
jest.mock('axios');
jest.mock('react-toastify');


describe('MatchingResults', () => {
  it('renders loading message while fetching data', () => {
    render(<MatchingResults />);
    expect(screen.getByText('Loading matching results...')).toBeInTheDocument();
  });

  it('renders error message if fetching fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));
    render(<MatchingResults />);
    await screen.findByText('Failed to fetch matching results. Please try again later.'); // Wait for the error message
     expect(toast.error).toHaveBeenCalledWith("Matching failed. Please try again later.");
  });


  it('renders no results message if no group or user is found', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: null }); // Mock group response
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: null }); // Mock user response

    render(<MatchingResults />);
    await screen.findByText('No matching results found.'); // Wait for the "no results" message
  });

  it('renders matching results correctly', async () => {
    const mockGroup = {
      participants: [
        { id: 1, interests: ['reading', 'hiking'] },
        { id: 2, interests: ['coding', 'hiking'] },
      ],
    };
    const mockUser = { id: 1, interests: ['reading', 'coding'] };

    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ data: mockGroup })
      .mockResolvedValueOnce({ data: mockUser });

    render(<MatchingResults />);

    await screen.findByText('Your Matched Group'); // Wait for the results to render

    // Check if shared interests are displayed correctly (example)

    expect(toast.success).toHaveBeenCalledWith("Matching successful!");


  });
});

```