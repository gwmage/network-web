```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Example: 10 posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts(currentPage, postsPerPage); // Assuming API function for fetching posts with pagination
        setPosts(data.posts || data); // Use data.posts if the API returns an object with a 'posts' property, otherwise use data directly.
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
  const totalPages = Math.ceil((posts.totalCount || posts.length) / postsPerPage); // Calculate total pages based on API response or data length if no totalCount is provided

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
        <div key={post.id}>{/* Display post content here */}
          <h3>{post.title}</h3>
          <p>{post.content}</p>
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