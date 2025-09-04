import React, { useState } from 'react';
import { deleteComment, updateComment } from '../utils/api';
import CommentForm from './CommentForm';
import { format } from 'date-fns';
import './Comment.css';

const Comment = ({ comment, currentUser, onCommentDelete, onCommentCreate, onCommentUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const handleEdit = async (updatedContent) => {
    try {
      await updateComment(comment.postId, comment.id, { content: updatedContent });
      setIsEditing(false);
      onCommentUpdate && onCommentUpdate();
    } catch (error) {
      console.error("Error updating comment:", error);
      // Handle error, e.g., display error message
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      onCommentDelete(comment.id); // Call onCommentDelete directly
      onCommentUpdate && onCommentUpdate();
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error, e.g