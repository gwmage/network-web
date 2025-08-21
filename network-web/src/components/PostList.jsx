```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Example: 10 posts per page
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts(currentPage, postsPerPage);
        setPosts(data.posts || []); // Ensure data.posts exists
        setTotalPages(data.totalPages || 1); // Get total pages from API response
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.summary}</p> {/* Display summary */}
          <p>Category: {post.category}</p> {/* Display category */}
          <p>Tags: {post.tags && post.tags.join(', ')}</p> {/* Display tags */}
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