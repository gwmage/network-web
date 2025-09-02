// File: network-api/routes/comments.js
const express = require('express');
const router = express.Router();

// ... other routes ...

router.delete('/:commentId', async (req, res) => {
  try {
    // ... existing code to delete comment
  } catch (error) {
    console.error("Error deleting comment:", error); // Log the full error object for better debugging
    return res.status(500).json({ message: 'Failed to delete comment' });
  }
});

export default router;