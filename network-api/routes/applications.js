"const express = require('express');
const router = express.Router();

// Placeholder for database interaction (replace with your actual database logic)
const applications = [];
let nextApplicationId = 1;

router.post('/', (req, res) => {
  try {
    const { userId, region, career, selfIntroduction, portfolioUrl } = req.body;

    // Basic validation (replace with more comprehensive validation as needed)
    if (!userId || !region || !career || !selfIntroduction) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newApplication = {
      id: nextApplicationId++,
      userId, region, career, selfIntroduction, portfolioUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    applications.push(newApplication);

    res.status(201).json({ id: newApplication.id, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;"