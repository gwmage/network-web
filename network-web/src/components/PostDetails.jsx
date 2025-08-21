```typescript
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import Comment from './Comment';
import CommentForm from './CommentForm';

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(1); // Replace with actual user ID retrieval

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const data = await api.getPost(postId);
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleCommentDelete = async (commentId) => {
    try {
      await api.deleteComment(postId, commentId);
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter((comment) => comment.id !== commentId),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };


  const handleCommentCreate = async (newComment) => {
    try {
      const createdComment = await api.createComment(postId, newComment);
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, createdComment],
      }));
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  }

  if (loading) {
    return <div>Loading post details...</div>;
  }

  if (error) {
    return <div>Error loading post details: {error.message}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <h3>Comments</h3>
      {/* Pass postId to CommentForm */}
      <CommentForm postId={postId} onCommentCreate={handleCommentCreate} />

      {post.comments && post.comments.length > 0 ? (
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id}>
              <Comment
                comment={comment}
                currentUser={currentUser}
                onCommentDelete={handleCommentDelete}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}



      <button onClick={() => navigate(-1)}>Back to Post List</button>
    </div>
  );
};

export default PostDetails;

```