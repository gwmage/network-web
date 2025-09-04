// File: network-api/routes/comments.js
const express = require('express');
const router = express.Router();
const { Comment } = require('../entities/comment.entity'); // Assuming you have a Comment entity
const { Post } = require('../entities/post.entity');
const { User } = require('../entities/user.entity'); // Import User entity
const { getRepository } = require('typeorm');



// GET comments for a specific post
/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Get comments for a post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Returns a list of comments for the post
 *       500:
 *         description: Internal Server Error
 */
router.get('/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const comments = await getRepository(Comment)
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author') // Join with the author
      .leftJoinAndSelect('comment.children', 'children') // Fetch nested comments
      .leftJoinAndSelect('children.author', 'childrenAuthor') // Join nested comments with their authors
      .where('comment.postId = :postId', { postId })
      .orderBy('comment.createdAt', 'ASC') // Order comments by creation time
      .getMany();
    res.json(comments);
  } catch (error) {
    console.error('Error retrieving comments:', error);
    res.status(500).json({ message: 'Failed to retrieve comments' });
  }
});


// POST a new comment
/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *     summary: Create a new comment
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               parentCommentId:
 *                 type: integer
 *                 description: ID of the parent comment (if any)
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad Request (e.g., missing fields)
 *       500:
 *         description: Internal Server Error
 */
router.post('/:postId', async (req, res) => {
  try {

    const { content, parentCommentId } = req.body;
    const postId = parseInt(req.params.postId, 10);

    const post = await getRepository(Post).findOne(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Assuming you are managing user authentication (e.g., using JWT)
    const userId = req.user.id; // Replace with your actual user ID retrieval method

    const user = await getRepository(User).findOne(userId);
    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' }); // Or handle as appropriate for your auth setup
    }


    const newComment = new Comment();
    newComment.content = content;
    newComment.post = post; // Associate comment with post
    newComment.author = user;  // Associate the comment with the logged-in user


    if (parentCommentId) {
      const parentComment = await getRepository(Comment).findOne(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
      newComment.parent = parentComment;
    }

    const savedComment = await getRepository(Comment).save(newComment);
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Failed to create comment' });
  }
});



// PUT update an existing comment
/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Update a comment
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:commentId', async (req, res) => {
    try {
        const commentId = parseInt(req.params.commentId, 10);
        const { content } = req.body;

        const commentRepository = getRepository(Comment);
        const comment = await commentRepository.findOne(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Authorization check: Only allow the author of the comment to update it
        // Assuming you have req.user.id available from authentication middleware
        if (comment.author.id !== req.user.id) { 
            return res.status(401).json({ message: 'Unauthorized to update this comment' });
        }

        comment.content = content;
        const updatedComment = await commentRepository.save(comment);

        res.json(updatedComment);
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Failed to update comment' });
    }
});


// DELETE an existing comment
/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the comment to delete
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:commentId', async (req, res) => {
    try {
        const commentId = parseInt(req.params.commentId, 10);
        const commentRepository = getRepository(Comment);
        const comment = await commentRepository.findOne(commentId, { relations: ['author'] }); // Include author relation to check ownership

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Authorization check: Only allow the author of the comment to delete it
        // Assuming you have req.user.id available from authentication middleware
        if (comment.author.id !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized to delete this comment' });
        }


        await commentRepository.remove(comment);

        res.sendStatus(204); // No content
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Failed to delete comment' });
    }
});


export default router;