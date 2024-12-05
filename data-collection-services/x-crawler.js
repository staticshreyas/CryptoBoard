// Vignesh's Key AAAAAAAAAAAAAAAAAAAAAOtQxQEAAAAAt18yuKeBpSb%2BY%2FME2fT%2Fi%2BWsHws%3D4yRvqA3C9fH9PzzdIUAJoz2ywEzZx1srBktIMgMtkdrUJYLvt5

// x-crawler.js

const axios = require('axios');
const { savePost } = require('./utils/database');
const config = require('config');

const fetchXPosts = async () => {
  try {
    const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
      params: {
        query: '#cryptocurrency',
        max_results: 10, // Adjust to stay within rate limits
      },
      headers: {
        Authorization: `Bearer ${config.get('twitterBearerToken')}`,
      },
    });

    const posts = response.data.data || [];

    for (const post of posts) {
      await savePost({ content: post.text, id: post.id, source: 'X' });
    }

    console.log('X Posts fetched and saved.');
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error('Rate limit exceeded. Please wait before making new requests.');
    } else {
      console.error('Error fetching X posts:', error.message);
    }
  }
};

module.exports = fetchXPosts;
