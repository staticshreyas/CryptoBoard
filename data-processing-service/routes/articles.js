// routes/articles.js

const express = require('express');
const router = express.Router();
const Article = require('../shared-models/Article');

// Get articles with filters
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, source } = req.query;
    const filter = {};

    // Date Filters
    if (startDate || endDate) {
      filter.dateFetched = {};
      if (startDate) filter.dateFetched.$gte = new Date(startDate);
      if (endDate) filter.dateFetched.$lte = new Date(endDate);
    }

    // Source Filter
    if (source && source !== '') {
      filter.source = source;
    }

    // Fetch articles from the database with filters
    const articles = await Article.find(filter).sort({ dateFetched: -1 });
    res.json(articles);
  } catch (err) {
    console.error('Error fetching articles:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
