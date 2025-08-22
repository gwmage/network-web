```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PostList from './PostList';
import * as api from '../utils/api';

jest.mock('../utils/api'); // Mock the api module

describe('PostList Component', () => {
  it('renders loading state while fetching data', () => {
    render(<PostList filters={{}} />); // Pass empty filters for initial test
    expect(screen.getByText('Loading posts...')).toBeVisible();
  });

  it('renders post list correctly', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', content: 'Content 1', createdAt: '2024-01-01' },
      { id: 2, title: 'Post 2', content: 'Content 2', createdAt: '2024-01-02' },
    ];
    api.fetchPosts.mockResolvedValue({ data: mockPosts });

    render(<PostList filters={{}} />);

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeVisible();
      expect(screen.getByText('Post 2')).toBeVisible();
    });
  });


  it('handles API errors gracefully', async () => {
    const errorMessage = 'Failed to fetch posts';
    api.fetchPosts.mockRejectedValue(new Error(errorMessage));

    render(<PostList filters={{}} />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeVisible(); // Or a more user-friendly error message
    });
  });

  it('filters posts based on provided filters', async () => {
      const mockPosts = [
          { id: 1, title: 'React Post', content: 'Content 1', category: 'react', tags: ['javascript'] },
          { id: 2, title: 'Angular Post', content: 'Content 2', category: 'angular', tags: ['typescript'] },
      ];
      api.fetchPosts.mockResolvedValue({ data: mockPosts });

      render(<PostList filters={{ category: 'react' }} />);

      await waitFor(() => {
          expect(screen.getByText('React Post')).toBeVisible();
          expect(screen.queryByText('Angular Post')).toBeNull(); // Should not be present after filtering
      });


      render(<PostList filters={{ tags: ['typescript'] }} />);
      await waitFor(() => {
          expect(screen.getByText('Angular Post')).toBeVisible();
          expect(screen.queryByText('React Post')).toBeNull();
      });
  });

  it('handles pagination correctly', async () => {
    const mockPosts = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        title: `Post ${i + 1}`,
        content: `Content ${i + 1}`,
        createdAt: '2024-01-01'
    }));

    api.fetchPosts.mockResolvedValue({ data: mockPosts });
    render(<PostList filters={{}} />);

    // Check initial page
    await waitFor(() => {
        // Check if only the first 10 posts (default postsPerPage) are visible
        mockPosts.slice(0, 10).forEach(post => {
            expect(screen.getByText(post.title)).toBeVisible();
        });
        mockPosts.slice(10).forEach(post => {
            expect(screen.queryByText(post.title)).toBeNull();
        });
    });

    // Implement logic to simulate clicking "next page" and check the next set of posts
    // (This will depend on how you implement pagination within the component)
  });

});

```