// File: network-web/src/components/CommunityBoard.jsx
import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import PostDetails from './PostDetails';
import Filters from './Filters';
import LoadingIndicator from './LoadingIndicator';

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with your actual API endpoint and fetch logic
        const response = await fetch('/api/posts', { method: 'GET' }); // Example
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostSelect = (post) => {
    setCurrentPost(post);
  };

  return (
    <div>
      <h1>Community Board</h1>
      <PostForm onPostCreated={handlePostCreated} />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Filters onFilterChange={handleFilterChange} />
          <PostList posts={posts} onPostSelect={handlePostSelect} />
          {currentPost && <PostDetails post={currentPost} />}
        </>
      )}
    </div>
  );
};

export default CommunityBoard;
