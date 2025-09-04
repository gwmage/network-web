```typescript
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import CommentList from './CommentList'; // Import the CommentList component
import './PostDetails.css';
import api from '../api';

const PostDetails = ({ currentUser }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);


    useEffect(() => {
        const fetchPost = async () => {
          try {
            const fetchedPost = await api.getPost(parseInt(id, 10));
            setPost(fetchedPost);
          } catch (error) {
            console.error('Error fetching post:', error);
            // Handle error, e.g., display an error message or redirect
          }
        };
    
        fetchPost();
      }, [id]);

      const handleCommentUpdate = () => {
        // This function will be passed down to the CommentList and Comment components
        // It will be called whenever a comment is created, updated, or deleted
        // to refresh the comment list.
        console.log("Refreshing comments");
      };
    
    
      if (!post) {
        return <div>Loading post...</div>;
      }

  const formattedDate = format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm:ss');

  return (
    <div className="post-details-container">
      <article className="post-details">
        <h2>{post.title}</h2>
        <p className="post-metadata">
          By {post.author ? post.author.username : 'Unknown Author'} on {formattedDate}
        </p>
        <p className="post-content">{post.content}</p>

        <CommentList postId={post.id} currentUser={currentUser} onCommentUpdate={handleCommentUpdate} />
      </article>


      <Link to="/" className="back-to-posts">
        Back to Posts
      </Link>
    </div>
  );
};

export default PostDetails;

```