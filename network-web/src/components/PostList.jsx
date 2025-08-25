```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import Filters from './Filters'; // Import the Filters component

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [filters, setFilters] = useState({}); // State for filters

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await api.getPosts(currentPage, postsPerPage, filters);
        setPosts(data.items || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage, filters]);

  const handleDelete = async (postId) => {
    // ... (existing delete logic)
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Logic for displaying page numbers (can be improved with a dedicated pagination component)
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <Filters onChange={handleFiltersChange} /> {/* Include the Filters component */}
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}...</p> {/* Content snippet */}
          <p>Author: {post.author}</p> {/* Assuming 'author' field exists */}
          <p>Created: {new Date(post.created_at).toLocaleDateString()}</p> {/* Format date */}
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => handlePageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

```