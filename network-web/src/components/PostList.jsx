```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { format } from 'date-fns'; // Import date-fns for formatting
import Filters from './Filters';


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await api.getPosts(currentPage, postsPerPage, filters);
        setPosts(data.posts || []);
        setTotalPosts(data.total || 0);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage, filters]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
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
        setPosts(posts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again later.');
      }
    }
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };


  if (loading) return <div>Loading posts...</div>; // More descriptive loading message
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Filters onChange={handleFilterChange} /> {/* Integrate Filters component */}
      {posts.map((post) => (
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