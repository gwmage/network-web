```typescript
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostDetails from './PostDetails'; // Import PostDetails
import PostForm from './PostForm';
import CommentForm from './CommentForm'; // Import CommentForm
import CommentList from './CommentList'; // Import CommentList
import LoadingIndicator from './LoadingIndicator';
import Filters from './Filters';
import { getComments } from '../utils/api'; // Import getComments

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]); // State for comments
  const [currentPost, setCurrentPost] = useState(null); // State for the selected post
  const [currentPostId, setCurrentPostId] = useState(null); // State for the ID of the selected post for comments
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

  const fetchComments = async (postId) => { // Function to fetch comments for a post
    try {
      const fetchedComments = await getComments(postId);
      setComments(fetchedComments);
      setCurrentPostId(postId)
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handlePostSelect = (post) => { // Handler for selecting a post
    setCurrentPost(post);
    fetchComments(post.id); // Fetch comments when a post is selected
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
          {currentPost && ( // Conditionally render PostDetails and CommentForm
            <>
              <PostDetails post={currentPost} />
              <CommentForm postId={currentPost.id} /> {/* Pass postId to CommentForm */}
            </>
          )}
          {currentPostId && <CommentList comments={comments} postId={currentPostId} />} {/* Conditionally render CommentList */}

        </>
      )}
    </div>
  );
};

export default CommunityBoard;

```