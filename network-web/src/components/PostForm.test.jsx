```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostForm from './PostForm';
import { createPost, updatePost } from '../utils/api';

jest.mock('../utils/api');

describe('PostForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Content')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Tags')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Post' })).toBeInTheDocument();
  });

  it('handles form submission for new post', async () => {
    createPost.mockResolvedValue({ id: 1, title: 'Test Title', content: 'Test Content' });
    render(<PostForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Test Content' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Post' }));

    expect(createPost).toHaveBeenCalledWith({ title: 'Test Title', content: 'Test Content', category: '', tags: '' });
    await expect(mockOnSubmit).toHaveBeenCalledWith({ id: 1, title: 'Test Title', content: 'Test Content' });
  });


  it('handles form submission for updating post', async () => {
    const existingPost = { id: 1, title: 'Existing Title', content: 'Existing Content', category: 'test', tags: ['tag1', 'tag2'] };
    updatePost.mockResolvedValue({ ...existingPost, title: 'Updated Title', content: 'Updated Content' });

    render(<PostForm post={existingPost} onUpdate={mockOnUpdate} />);

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Title' } });
    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Updated Content' } });
    fireEvent.click(screen.getByRole('button', { name: 'Update Post' }));

    expect(updatePost).toHaveBeenCalledWith(1, { ...existingPost, title: 'Updated Title', content: 'Updated Content', category: 'test', tags: ['tag1', 'tag2'] });

    await expect(mockOnUpdate).toHaveBeenCalledWith({ ...existingPost, title: 'Updated Title', content: 'Updated Content' });


  });

  it('handles API errors', async () => {
    const errorMessage = 'Failed to create post';
    createPost.mockRejectedValue(new Error(errorMessage));

    render(<PostForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Test Content' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Post' }));

    // Add assertions for handling API errors
    // For instance, display the error message in UI or log the error.
  });
});

```