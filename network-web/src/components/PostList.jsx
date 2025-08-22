```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { format } from 'date-fns'; // Import date-fns for formatting

const PostList = ({ filters }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await api.getPosts(currentPage, postsPerPage, filters);
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage, filters]);

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


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>By: {post.author?.username || 'Unknown'}</p>
          <p>Created: {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}</p>
          <p>Category: {post.category}</p>
          <p>Tags: {post.tags && post.tags.join(', ')}</p>
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