```typescript
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import LoadingIndicator from './LoadingIndicator';
import Filters from './Filters';
import CommentList from './CommentList';
import { getComments } from '../utils/api';

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
        setPosts(data.items);
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

  const [comments, setComments] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);

  const fetchComments = async (postId) => {
    try {
      const fetchedComments = await getComments(postId);
      setComments(fetchedComments);
      setCurrentPostId(postId)
    } catch (error) {
      console.error('Error fetching comments:', error);
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
          <PostList posts={posts} onPostSelect={fetchComments} /> {/* Pass the fetchComments function */}
          {currentPostId && <CommentList comments={comments} postId={currentPostId} />} {/* Conditionally render CommentList */}

        </>
      )}
    </div>
  );
};

export default CommunityBoard;

```