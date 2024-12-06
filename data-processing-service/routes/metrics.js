// routes/metrics.js

const express = require('express');
const router = express.Router();
const Article = require('../shared-models/Article');
const Post = require('../shared-models/Post');

// Source Ratio
router.get('/source-ratio', async (req, res) => {
  try {
    const newsCount = await Article.countDocuments({});

    const socialMediaCount = await Post.countDocuments({});

    res.json({
      newsCount,
      socialMediaCount,
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Compare Cryptocurrencies
router.get('/compare', async (req, res) => {
  try {
    const { crypto1, crypto2 } = req.query;

    if (!crypto1 || !crypto2) {
      return res.status(400).json({ msg: 'Both crypto1 and crypto2 are required' });
    }

    const data1 = await CryptoPrice.find({ symbol: crypto1 }).sort({ date: 1 });
    const data2 = await CryptoPrice.find({ symbol: crypto2 }).sort({ date: 1 });

    res.json({ data1, data2 });
  } catch (err) {
    console.error('Error fetching comparison data:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
