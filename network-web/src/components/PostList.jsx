```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import SearchBar from './SearchBar'; // Import SearchBar component

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('all');
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts(currentPage, postsPerPage, searchTerm, searchOption);
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage, searchTerm, searchOption]);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
        setSearchResults(searchResults.filter(post => post.id !== postId)); // Also remove from search results
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again later.');
      }
    }
  };

  const handleSearch = (term, option) => {
    setSearchTerm(term);
    setSearchOption(option);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Logic for displaying page numbers
  const pageNumbers = [];
  const totalPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const displayedPosts = searchTerm ? searchResults : posts;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {displayedPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
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