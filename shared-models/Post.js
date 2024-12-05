// shared-models/Post.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: String,
  id: String,
  source: String,
  dateFetched: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
