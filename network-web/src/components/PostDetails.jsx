import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import CommentList from './CommentList';
import PostForm from './PostForm'; // Import PostForm
import './PostDetails.css';
import { getPost, deletePost } from '../utils/api';


const PostDetails = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);


  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPost = await getPost(parseInt(id, 10));
        setPost(fetchedPost);
      } catch (error) {
        setError('Error fetching post. Please try again later.');
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handlePostUpdate = (updatedPost) => {
    setPost(updatedPost);
    setEditing(false); // Exit edit mode after updating
  };

  const handlePostDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id);
        navigate('/'); // Redirect to the home page or post list after deletion
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again later.');
      }
    }
  };

  const handleCommentUpdate = () => {
    console.log("Refreshing comments");
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div>Post not found.</div>;



  const formattedDate = format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm:ss');

  return (
    <div className="post-details-container">
      <article className="post-details">
        {/* Conditionally render either the post details or the edit form */}
        {editing ? (
          <PostForm post={post} onSubmit={handlePostUpdate} onUpdate={handlePostUpdate} />
        ) : (
          <>
            <h2>{post.title}</h2>
            <p className="post-metadata">
              By {post.author ? post.author.username : 'Unknown Author'} on {formattedDate}
            </p>
            <p className="post-content">{post.content}</p>
            <p>Category: {post.category?.name || 'None'}</p> {/* Display category */}
            <p>Tags: {post.tags?.map(tag => tag.name).join(', ') || 'None'}</p> {/* Display tags */}

            {/* Edit and Delete buttons (only if currentUser is the author) */}
            {currentUser && currentUser.id === post.author?.id && (
              <div className="edit-delete-buttons">
                <button onClick={() => setEditing(true)}>Edit</button>
                <button onClick={handlePostDelete}>Delete</button>
              </div>
            )}
          </>
        )}


        <CommentList postId={post.id} currentUser={currentUser} onCommentUpdate={handleCommentUpdate} />
      </article>

      <Link to="/" className="back-to-posts">
        Back to Posts
      </Link>

    </div>
  );
};

export default PostDetails;