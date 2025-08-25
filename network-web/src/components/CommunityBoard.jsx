```typescript
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import LoadingIndicator from './LoadingIndicator';
import Filters from './Filters';
import { getPosts, getComments } from '../utils/api'; // Import getPosts and getComments

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const [filters, setFilters] = useState({ category: '', tags: [] });
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [perPage] = useState(10); // Number of posts per page


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(filters, currentPage, perPage); // Pass pagination params to getPosts
        setPosts(data.items || []); // Handle potential undefined 'items'
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters, currentPage]); // Add currentPage as a dependency

  const fetchComments = async (postId) => {
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError("Failed to load comments. Please try again later."); // Set error message for comments
    }
  };


  const handlePostSelect = (post) => {
    setCurrentPost(post);
    fetchComments(post.id);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    setLoading(true); // Show loading indicator when filters change
  };

  const handlePostCreated = (newPost) => {
      setPosts([newPost, ...posts]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  return (
    <div>
      <h1>Community Board</h1>
      <PostForm onPostCreated={handlePostCreated} />
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p> // Display error message
      ) : (
        <>
          <Filters onFilterChange={handleFilterChange} />
          <PostList posts={posts} onPostSelect={handlePostSelect} />
          {currentPost && ( // Conditionally render PostDetails and CommentForm/List
            <>
              <PostDetails post={currentPost} />
              <CommentForm postId={currentPost.id} />
              <CommentList comments={comments} postId={currentPost.id} />
            </>
          )}
          <Pagination 
            currentPage={currentPage} 
            onPageChange={handlePageChange} 
            totalCount={posts.length} // You'll need to get the total count from the API
            perPage={perPage} 
          />
        </>
      )}
    </div>
  );
};

export default CommunityBoard;

```