```typescript
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { format } from 'date-fns';
import './PostDetails.css';

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Add currentUser state
  const [formattedDate, setFormattedDate] = useState('');


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await api.getPost(parseInt(postId, 10));
        setPost(fetchedPost);
        setFormattedDate(format(new Date(fetchedPost.createdAt), 'yyyy-MM-dd HH:mm:ss'));
      } catch (error) {
        console.error('Error fetching post:', error);
        // Handle error, e.g., display an error message or redirect
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const user = await api.getCurrentUser(); // Implement getCurrentUser in api.ts
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    }

    fetchPost();
    fetchCurrentUser();
  }, [postId]);

  const handleCommentCreate = async (newComment) => {
    try {
      await api.createComment(parseInt(postId, 10), newComment);
      // Update the post object with the new comment
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...(prevPost?.comments || []), newComment]
      }))
    } catch (error) {
      console.log('Error creating comment', error)
    }
  }

  const handleCommentUpdate = async (updatedComment) => {
    try {
      const response = await api.updateComment(parseInt(postId, 10), updatedComment.id, updatedComment);

      setPost(prevPost => {
        const updatedComments = prevPost.comments.map(comment => {
          if (comment.id === updatedComment.id) {
            return updatedComment;
          }
          return comment;
        });
        return { ...prevPost, comments: updatedComments };
      });
    } catch (error) {
      console.log('Error updating comment', error);
    }
  }

  const handleCommentDelete = async (commentId) => {
    try {
      await api.deleteComment(parseInt(postId, 10), commentId)
      setPost(prevPost => ({
        ...prevPost,
        comments: prevPost.comments.filter(comment => comment.id !== commentId)
      }));
    } catch (error) {
      console.log('Error deleting comment', error);
    }
  }

  if (!post) {
    return <div>Loading post...</div>;
  }


  return (
    // ... (rest of the code remains unchanged)
  );
};

export default PostDetails;
```