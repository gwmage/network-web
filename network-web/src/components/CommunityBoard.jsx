```javascript
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails';
import PostForm from './PostForm';
import Filters from './Filters';
import LoadingIndicator from './LoadingIndicator';
import { deletePost, updatePost } from '../utils/api'; // Import API functions

import './CommunityBoard.css'; // Import CSS file

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);
  const [filters, setFilters] = useState({ category: '', tags: [] });

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

  // ... (rest of the code remains the same)

  return (
    <div className="community-board-container"> {/* Added container */}
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