```javascript
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails';
import PostForm from './PostForm';
import Filters from './Filters';
import LoadingIndicator from './LoadingIndicator';
import PostSearch from './PostSearch'; // Import PostSearch component
import { deletePost, updatePost } from '../utils/api'; // Import API functions

import './CommunityBoard.css'; // Import CSS file

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);
  const [filters, setFilters] = useState({ category: '', tags: [] });
  const [searchResults, setSearchResults] = useState([]); // State for search results

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/posts?${queryParams}`); // Updated API endpoint
        const data = await response.json();
        setPosts(data.items || data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostSelect = (post) => {
    setCurrentPost(post);
  };

  const handlePostDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
      if (currentPost && currentPost.id === postId) {
        setCurrentPost(null);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error, e.g., display error message
    }
  };


  const handlePostUpdate = async (updatedPost) => {
    try {
      await updatePost(updatedPost.id, updatedPost);
      setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
      if (currentPost && currentPost.id === updatedPost.id) {
        setCurrentPost(updatedPost);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (results) => {
    setSearchResults(results);
    setLoading(false); // Set loading to false after receiving search results
  };


  return (
    <div className="community-board-container">
      <h1>Community Board</h1>
      <PostForm onPostCreated={handlePostCreated} />
      <PostSearch onSearch={handleSearch} /> {/* Integrate PostSearch */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Filters onFilterChange={handleFilterChange} />
          <PostList
            posts={searchResults.length > 0 ? searchResults : posts} // Display search results if available
            onPostSelect={handlePostSelect}
            onPostDelete={handlePostDelete}
            onPostUpdate={handlePostUpdate}
          />
          {currentPost && (
            <PostDetails
              post={currentPost}
              onPostUpdate={handlePostUpdate}
              onPostDelete={handlePostDelete}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CommunityBoard;
```