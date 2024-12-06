// utils/database.js

const mongoose = require('mongoose');
const config = require('config');
const Article = require('../shared-models/Article');
const Post = require('../shared-models/Post');

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'CryptoBoard'
    });
    console.log('Data Collection Service connected to MongoDB');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

const saveArticle = async (articleData) => {
  try {
    const article = new Article(articleData);
    await article.save();
  } catch (err) {
    console.error('Error saving article:', err.message);
  }
};

const savePost = async (postData) => {
  try {
    const post = new Post(postData);
    await post.save();
  } catch (err) {
    console.error('Error saving post:', err.message);
  }
};

module.exports = {
  connectDB,
  saveArticle,
  savePost
};
