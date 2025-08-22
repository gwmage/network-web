```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import PostDetails from './PostDetails';
import axios from 'axios';

jest.mock('axios');

describe('PostDetails Component', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post Title',
    content: 'Test Post Content',
    category: 'general',
    tags: ['test', 'post'],
    createdAt: '2024-11-20T12:00:00Z',
    updatedAt: '2024-11-20T12:00:00Z',
  };

  it('renders post details correctly', async () => {
    axios.get.mockResolvedValue({ data: mockPost });
    render(<PostDetails match={{ params: { id: '1' } }} />);

    expect(await screen.findByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('Test Post Content')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // Pending promise for loading state
    render(<PostDetails match={{ params: { id: '1' } }} />);
    // Add loading state assertion (e.g., checking for a loading indicator)
  });


  it('handles error state', async () => {
    const errorMessage = 'Error fetching post details';
    axios.get.mockRejectedValue(new Error(errorMessage));

    render(<PostDetails match={{ params: { id: '1' } }} />);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument(); // or check for error message display logic.
  });



  it('renders without crashing when no match prop provided', async () => {

    render(<PostDetails />);
  });
});


```