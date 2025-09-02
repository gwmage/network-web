```typescript
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails';
import PostForm from './PostForm';
import Filters from './Filters';
import LoadingIndicator from './LoadingIndicator';
import { deletePost, updatePost } from '../utils/api'; // Import API functions

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);
  const [filters, setFilters] = useState({ category: '', tags: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/posts?${queryParams}`);
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostSelect = (post) => {
    setCurrentPost(post);
  };


  const handlePostUpdate = async (updatedPost) => {
    try {
      const response = await updatePost(updatedPost.id, updatedPost);
      const updatedPosts = posts.map((post) =>
        post.id === updatedPost.id ? response : post
      );
      setPosts(updatedPosts);
      setCurrentPost(response); // Update the current post if it's being edited
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error, e.g., display error message
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      await deletePost(postId);
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      setCurrentPost(null); // Clear current post if it's deleted
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error, e.g., display error message
    }
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
          <PostList
            posts={posts}
            onPostSelect={handlePostSelect}
            onPostDelete={handlePostDelete} // Pass delete handler
            onPostUpdate={handlePostUpdate}
          />
          {currentPost && (
            <PostDetails
              post={currentPost}
              onPostUpdate={handlePostUpdate} // Pass update handler to PostDetails
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