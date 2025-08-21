```typescript
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostForm from './PostForm'; // Import PostForm
import LoadingIndicator from './LoadingIndicator';
import Filters from './Filters';

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', tags: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/posts?${queryParams}`);
        const data = await response.json();
        setPosts(data.items); // Access items from the paginated response
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
    setPosts([newPost, ...posts]); // Add the new post to the beginning of the list
  };


  return (
    <div>
      <h1>Community Board</h1>
      <PostForm onPostCreated={handlePostCreated} /> {/* Include the PostForm component */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Filters onFilterChange={handleFilterChange} />
          <PostList posts={posts} />
        </>
      )}
    </div>
  );
};

export default CommunityBoard;

```