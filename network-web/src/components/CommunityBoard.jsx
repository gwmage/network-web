```typescript
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails';
import PostForm from './PostForm';
import Filters from './Filters';
import LoadingIndicator from './LoadingIndicator';

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
        setPosts(data.items || data.posts); // Use "items" if present (for pagination), otherwise "posts"
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

```