const express = require('express');
const router = express.Router();

// Placeholder for database interaction (replace with your actual database logic)
const applications = [];
let nextApplicationId = 1;

router.post('/', (req, res) => {
  try {
    const { userId, region, career, selfIntroduction, portfolioUrl } = req.body;

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


router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, region, career, search } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let filteredApplications = applications;

    if (region) {
      filteredApplications = filteredApplications.filter(app => app.region.includes(region));
    }
    if (career) {
      filteredApplications = filteredApplications.filter(app => app.career.includes(career));
    }
    if (search) {
      filteredApplications = filteredApplications.filter(app => {
        return Object.values(app).some(value =>
          String(value).toLowerCase().includes(search.toLowerCase())
        );
      });
    }


    const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

    res.json({
      applications: paginatedApplications,
      total: filteredApplications.length,
    });


  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;