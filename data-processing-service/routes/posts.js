// routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../shared-models/Post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
