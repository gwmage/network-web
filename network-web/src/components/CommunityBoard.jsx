```typescript
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import LoadingIndicator from './LoadingIndicator';
import Filters from './Filters'; // Import the Filters component

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', tags: [] }); // State for filters

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString(); // Convert filters to query string
        const response = await fetch(`/api/posts?${queryParams}`); // Include filters in API call
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters]); // Re-fetch posts when filters change

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Update filter state when Filters component changes
  };

  return (
    <div>
      <h1>Community Board</h1>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Filters onFilterChange={handleFilterChange} /> {/* Include the Filters component */}
          <PostList posts={posts} />
        </>
      )}
    </div>
  );
};

export default CommunityBoard;

```