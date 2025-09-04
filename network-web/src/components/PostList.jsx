```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { format } from 'date-fns'; // Import date-fns for formatting
import Filters from './Filters';


const PostList = ({ posts, onPostSelect, onPostDelete, onPostUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
        try {
          await api.deletePost(postId);
          onPostDelete(postId)
        } catch (error) {
          console.error('Error deleting post:', error);
          alert('Failed to delete post. Please try again later.');
        }
      }
  };


  if (!posts) return <div>Loading posts...</div>; // More descriptive loading message


  return (
    <div>

      {currentPosts.map((post) => (
        <div key={post.id} className="post-container">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>By: {post.author?.username || 'Unknown'}</p>
          <p>Created: {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}</p>
          <p>Category: {post.categories?.map(c => c.name).join(', ') || 'None'}</p>
          <p>Tags: {post.tags?.map(t => t.name).join(', ') || 'None'}</p>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}

      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => handleClick(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

```