import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails';
import PostForm from './PostForm';
import Filters from './Filters';
import LoadingIndicator from './LoadingIndicator';
import PostSearch from './PostSearch';
import { deletePost } from '../utils/api';

import './CommunityBoard.css';

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);
  const [filters, setFilters] = useState({ category: '', tags: [] });
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Add currentUser state

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Fetch initial posts without filters (or apply default filters if needed)
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };


    // Simulated user login - replace with your actual authentication logic
    const user = { id: 1, username: 'testuser' };
    setCurrentUser(user);


    fetchPosts();
  }, []);

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
      // Remove the deleted post from search results if it exists
      setSearchResults(searchResults.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error, e.g., display error message
    }
  };

  const handlePostUpdate = async (updatedPost) => {
    // Update the posts state and potentially the currentPost
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
    if (currentPost && currentPost.id === updatedPost.id) {
      setCurrentPost(updatedPost);
    }
    // Update the search results if the updated post is in the search results
    setSearchResults(searchResults.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSearchResults([]); // Clear search results when filters change
    setCurrentPage(1);     // Reset pagination to first page when filters are changed
  };

  const handleSearch = (results) => {
    setSearchResults(results);
    setLoading(false);
  };

  return (
    <div className="community-board-container">
      <h1>Community Board</h1>
      <PostForm onPostCreated={handlePostCreated} /> {/* Pass onPostCreated handler */}
      <PostSearch onSearch={handleSearch} filters={filters} onFilterChange={handleFilterChange} />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Filters onFilterChange={handleFilterChange} />
          <PostList
            posts={posts}
            onPostSelect={handlePostSelect}
            onPostDelete={handlePostDelete}
            onPostUpdate={handlePostUpdate}
            filters={filters}
            searchResults={searchResults} // Pass searchResults to PostList
            currentUser={currentUser} // Pass currentUser to PostList
          />
          {currentPost && (
            <PostDetails
              post={currentPost}
              onPostUpdate={handlePostUpdate}
              onPostDelete={handlePostDelete}
              currentUser={currentUser} // Pass currentUser to PostDetails
            />
          )}
        </>
      )}
    </div>
  );
};

export default CommunityBoard;