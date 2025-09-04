```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import necessary components
import PostDetails from './PostDetails';
import CommentList from './CommentList'; // Import CommentList
import '@testing-library/jest-dom';
import api from '../api'; // Import your api module

jest.mock('../api');  // Mock the api module

// Mock data for a post
const mockPost = {
  id: 1,
  title: 'Test Post',
  content: 'This is a test post.',
  createdAt: '2024-03-15T10:00:00.000Z',
  author: {
    id: 123,
    username: 'testuser',
  },
};

// Mock data for comments (including nested comments)
const mockComments = [
  {
    id: 101,
    content: 'Comment 1',
    createdAt: '2024-03-15T11:00:00.000Z',
    author: { id: 456, username: 'commenter1' },
    children: [
      {
        id: 102,
        content: 'Reply to Comment 1',
        createdAt: '2024-03-15T12:00:00.000Z',
        author: { id: 789, username: 'commenter2' },
      },
    ],
  },
  {
    id: 103,
    content: 'Comment 2',
    createdAt: '2024-03-15T13:00:00.000Z',
    author: { id: 101, username: 'commenter3' },
  },
];


describe('PostDetails Component', () => {
  it('renders post details correctly', async () => {
    api.getPost.mockResolvedValue(mockPost);  // Mock the getPost API call
    api.getComments.mockResolvedValue(mockComments); // Mock getComments

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/posts/:id" element={<PostDetails currentUser={{ id: 123 }} />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Post');
      expect(screen.getByText('By testuser on 2024-03-15 10:00:00')).toBeInTheDocument(); // Verify metadata
      expect(screen.getByText('This is a test post.')).toBeInTheDocument(); // Verify content
    });

    // Check if CommentList is rendered and receives the correct props
    expect(screen.getByRole('list')).toBeInTheDocument(); // Assuming <ul> is used in CommentList
  });


  it('renders comments correctly', async () => {
    api.getPost.mockResolvedValue(mockPost);
    api.getComments.mockResolvedValue(mockComments);


    render(
        <BrowserRouter>
          <Routes>
            <Route path="/posts/:id" element={<PostDetails currentUser={{ id: 123 }} />} />
          </Routes>
        </BrowserRouter>
      );

    // Wait for comments to load and render (adjust timeout as needed)
    await waitFor(() => {
      expect(screen.getByText('Comment 1')).toBeVisible();
      expect(screen.getByText('Reply to Comment 1')).toBeVisible();
      expect(screen.getByText('Comment 2')).toBeVisible();
      expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(1); // Check for the presence of the comment list

    }, { timeout: 1000 });


  });

  it('handles post loading state', () => {
    api.getPost.mockImplementation(() => new Promise(() => {})); // Simulate ongoing request

    render(
        <BrowserRouter>
          <Routes>
            <Route path="/posts/:id" element={<PostDetails currentUser={{ id: 123 }} />} />
          </Routes>
        </BrowserRouter>
      );

    // Check if loading message is displayed
    expect(screen.getByText('Loading post...')).toBeInTheDocument();
  });

  // ... add tests for error handling, onCommentUpdate functionality, etc.


  it('handles error fetching post', async () => {
    const errorMessage = 'Error fetching post';
    api.getPost.mockRejectedValue(new Error(errorMessage));

    render(
        <BrowserRouter>
          <Routes>
            <Route path="/posts/:id" element={<PostDetails currentUser={{ id: 123 }} />} />
          </Routes>
        </BrowserRouter>
      );

    // Assert error message or behavior (e.g., check for error boundary)
    // Example for console error:
    //   expect(console.error).toHaveBeenCalledWith(errorMessage);

    // Or, render an error component:
    // await waitFor(() => {
    //   expect(screen.getByText(/Error fetching post/i)).toBeInTheDocument();
    // });

  });
});



describe('CommentList Component', () => {

    // ... your existing tests for CommentList ...

    it('renders "No comments yet." message when no comments exist', async () => {

        api.getComments.mockResolvedValue([]); // Mock an empty comment array

        render(<CommentList postId={1} currentUser={{ id: 1 }} />); // Render CommentList

        expect(await screen.findByText('No comments yet.')).toBeInTheDocument();
        });


});



```