// shared-models/Article.js

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  url: String,
  source: String,
  dateFetched: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', ArticleSchema);
