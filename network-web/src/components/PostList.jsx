```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { format } from 'date-fns'; // Import date-fns for formatting

const PostList = ({ filters }) => { // Accept filters as props
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await api.getPosts(currentPage, postsPerPage, filters); // Pass filters to API call
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); // Set loading to false after fetching, regardless of success or failure
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage, filters]); // Include filters in dependency array

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
        <div key={post.id} className="post-container"> {/* Add a class for styling */}
          <h3>{post.title}</h3>
          <p>{post.content}</p> {/* Display full content */}
          <p>By: {post.author?.username || 'Unknown'}</p> {/* Display author's username */}
          <p>Created: {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}</p> {/* Formatted date */}
          <p>Category: {post.category}</p>
          <p>Tags: {post.tags && post.tags.join(', ')}</p>
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