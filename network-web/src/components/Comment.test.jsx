```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Comment from './Comment';
import CommentForm from './CommentForm'; // Import CommentForm
import { format } from 'date-fns';
import { deleteComment, updateComment } from '../utils/api';
import '@testing-library/jest-dom';


jest.mock('../utils/api');  // Mock the api.js file

const mockComment = {
  id: 1,
  content: 'This is a test comment.',
  createdAt: '2024-03-15T10:00:00.000Z',
  author: { id: 123, username: 'testuser' },
  postId: 5, // Add postId to the mock comment
  children: [
    {
      id: 2,
      content: 'This is a nested comment.',
      createdAt: '2024-03-15T11:00:00.000Z',
      author: { id: 456, username: 'nesteduser' },
      postId: 5
    },
  ],
};

const formattedDate = format(new Date(mockComment.createdAt), 'yyyy-MM-dd HH:mm');

describe('Comment Component', () => {
    it('renders comment content and author correctly', () => {
        render(<Comment comment={mockComment} currentUser={{